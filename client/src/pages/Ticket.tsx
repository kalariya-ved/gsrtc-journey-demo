/** Civic Transit Portal design: compact e-ticket preview, formal travel facts, QR-style verification box, and clearly marked sandbox status. */
import { ArrowLeft, CheckCircle2, Download, Printer, QrCode, Send, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { BookingShell } from "@/components/BookingShell";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

export default function Ticket() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const seats = params.get("seats") || "A3";
  const passenger = params.get("name") || "Traveller";
  return <BookingShell step="ticket" eyebrow="Journey ticket" title="Sandbox booking preview"><div className="ticket-notice"><CheckCircle2 /><span><b>Preview created for design and flow testing.</b><small>No real payment, booking, reservation, or travel entitlement has been created.</small></span></div><section className="ticket-paper"><div className="ticket-paper-head"><div className="ticket-document-lockup"><img src={routePulseLogo} alt="" /><div><span>ROUTEPULSE TRANSIT</span><h2>Intercity Journey Preview</h2><p>Booking reference: RP-DEMO-82467</p></div></div><div className="ticket-status">Sandbox preview</div></div><div className="ticket-route"><div><b>Ahmedabad</b><span>06:30</span><small>Central Bus Terminal · Bay 12</small></div><i /><div><b>Vadodara</b><span>12:20</span><small>Main Transit Depot · Platform 4</small></div></div><div className="ticket-facts"><span><b>Travel date</b>Sun, 23 Aug 2026</span><span><b>Service</b>RoutePulse Express · RP-420</span><span><b>Passenger</b>{passenger}</span><span><b>Seat</b>{seats}</span><span><b>Fare preview</b>₹513</span><span><b>Booking status</b>Not confirmed</span></div><div className="ticket-verification"><div><ShieldCheck /><span><b>Verification reference</b><small>Use the booking reference in the full service to retrieve a real ticket when integrations are configured.</small></span></div><div className="ticket-qr"><QrCode /><small>Preview code</small></div></div></section><div className="ticket-actions"><button onClick={() => toast.info("Printing is available in the connected ticket service.")}><Printer />Print preview</button><button onClick={() => toast.info("PDF export will be available after a real ticket is issued.")}><Download />Download PDF</button><button onClick={() => toast.info("Messaging delivery requires a configured business channel.")}><Send />Send message</button><button onClick={() => navigate("/dashboard")} className="ticket-dashboard-action">View dashboard <ArrowLeft /></button></div></BookingShell>;
}
