import base64
import hashlib
import json
import os
import socket
import struct
import time
from pathlib import Path
from urllib.parse import urlsplit

import requests

BASE_URL = "https://3000-irgityvk4j5x2xahrpfza-c76a506c.us3.manus.computer/ticket?name=Demo%20Traveller&seats=A3%2CB2&contactMobile=9876543210&contactEmail=demo%40example.com"
DOWNLOAD_DIR = Path("/home/ubuntu/Downloads/pdf-smoke")
DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)
for previous in DOWNLOAD_DIR.glob("*"):
    previous.unlink()


def connect_websocket(url):
    parts = urlsplit(url)
    sock = socket.create_connection((parts.hostname, parts.port or 80), timeout=10)
    key = base64.b64encode(os.urandom(16)).decode()
    request = f"GET {parts.path} HTTP/1.1\r\nHost: {parts.hostname}:{parts.port}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n"
    sock.sendall(request.encode())
    response = b""
    while b"\r\n\r\n" not in response:
        response += sock.recv(4096)
    expected = base64.b64encode(hashlib.sha1((key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").encode()).digest()).decode()
    if f"Sec-WebSocket-Accept: {expected}" not in response.decode(errors="replace"):
        raise RuntimeError("CDP WebSocket handshake failed")
    return sock


def send_frame(sock, payload):
    data = payload.encode()
    length = len(data)
    mask = os.urandom(4)
    if length < 126:
        header = struct.pack("!BB", 0x81, 0x80 | length)
    elif length < 65536:
        header = struct.pack("!BBH", 0x81, 0x80 | 126, length)
    else:
        header = struct.pack("!BBQ", 0x81, 0x80 | 127, length)
    masked = bytes(byte ^ mask[index % 4] for index, byte in enumerate(data))
    sock.sendall(header + mask + masked)


def recv_frame(sock):
    header = sock.recv(2)
    if len(header) != 2:
        raise RuntimeError("CDP connection closed")
    first, second = header
    length = second & 0x7F
    if length == 126:
        length = struct.unpack("!H", sock.recv(2))[0]
    elif length == 127:
        length = struct.unpack("!Q", sock.recv(8))[0]
    if second & 0x80:
        mask = sock.recv(4)
    else:
        mask = None
    payload = b""
    while len(payload) < length:
        payload += sock.recv(length - len(payload))
    if mask:
        payload = bytes(byte ^ mask[index % 4] for index, byte in enumerate(payload))
    if (first & 0x0F) == 0x9:
        send_frame(sock, payload.decode())
        return recv_frame(sock)
    return payload.decode()


targets = requests.get("http://127.0.0.1:9222/json/list", timeout=5).json()
page_target = next((target for target in targets if target.get("type") == "page"), None)
if not page_target:
    raise RuntimeError(f"No Chromium page target found: {targets}")
sock = connect_websocket(page_target["webSocketDebuggerUrl"])

next_id = 0


def call(method, params=None):
    global next_id
    next_id += 1
    send_frame(sock, json.dumps({"id": next_id, "method": method, "params": params or {}}))
    while True:
        message = json.loads(recv_frame(sock))
        if message.get("id") == next_id:
            return message


call("Page.setDownloadBehavior", {"behavior": "allow", "downloadPath": str(DOWNLOAD_DIR)})
call("Page.enable")
call("Runtime.enable")
call("Page.navigate", {"url": BASE_URL})
time.sleep(2.5)
click = call("Runtime.evaluate", {"expression": "Array.from(document.querySelectorAll('button')).find((button) => button.innerText.includes('Download PDF'))?.click(); 'clicked'", "returnByValue": True})
if "exceptionDetails" in click.get("result", {}):
    raise RuntimeError(click)
time.sleep(2.5)
files = list(DOWNLOAD_DIR.glob("*.pdf"))
if not files:
    raise RuntimeError(f"No PDF downloaded. Directory contents: {list(DOWNLOAD_DIR.iterdir())}")
print(files[0])
