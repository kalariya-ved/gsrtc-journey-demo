/** Civic Transit Portal design: compact e-ticket preview, formal travel facts, QR-style verification box, and clearly marked sandbox status. */
import { ArrowLeft, CheckCircle2, Download, MessageSquareText, Printer, QrCode, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { BookingShell } from "@/components/BookingShell";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

export default function Ticket() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const seats = params.get("seats") || "A3";
  const passenger = params.get("name") || "Traveller";
  const bookingReference = "RP-DEMO-82467";
  const ticketText = `RoutePulse Transit demo ticket\nReference: ${bookingReference}\nAhmedabad 06:30 → Vadodara 12:20\nPassenger: ${passenger}\nSeat: ${seats}\nThis is a sandbox preview and not valid for travel.`;

  const downloadDemoPdf = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    pdf.setFillColor(6, 78, 139);
    pdf.rect(0, 0, 595, 82, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("ROUTEPULSE TRANSIT", 42, 47);
    pdf.setFontSize(9);
    pdf.text("SANDBOX TICKET PREVIEW — NOT VALID FOR TRAVEL", 42, 64);
    pdf.setTextColor(22, 57, 87);
    pdf.setFontSize(18);
    pdf.text("Intercity Journey Preview", 42, 126);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const lines = [
      `Booking reference: ${bookingReference}`,
      "Route: Ahmedabad (06:30) to Vadodara (12:20)",
      "Service: RoutePulse Express · RP-420 · Volvo AC Seater",
      `Passenger: ${passenger}`,
      `Selected seat(s): ${seats}`,
      "Fare preview: ₹513",
      "Status: Not confirmed — sandbox demonstration only.",
    ];
    lines.forEach((line, index) => pdf.text(line, 42, 165 + index * 24));
    pdf.setFillColor(238, 246, 251);
    pdf.rect(42, 364, 510, 74, "F");
    pdf.setTextColor(55, 91, 120);
    pdf.setFontSize(10);
    pdf.text("This file is generated from the RoutePulse prototype. It does not create a booking, reserve a seat,", 56, 394);
    pdf.text("collect payment, or grant an entitlement to travel.", 56, 414);
    pdf.save(`${bookingReference.toLowerCase()}-preview.pdf`);
    toast.success("Demo ticket PDF downloaded. It is clearly marked as a sandbox preview.");
  };

  const createSmsDraft = () => {
    const smsUrl = `sms:?&body=${encodeURIComponent(ticketText)}`;
    window.location.href = smsUrl;
    navigator.clipboard?.writeText(ticketText).catch(() => undefined);
    toast.success("Demo SMS draft prepared. The text was also copied where supported.");
  };

  return <BookingShell step="ticket" eyebrow="Journey ticket document" title="Intercity journey preview"><div className="ticket-notice"><CheckCircle2 /><span><b>Demonstration document.</b><small>This preview shows the final ticket format; it does not create a reservation or travel entitlement.</small></span></div><section className="ticket-paper"><div className="ticket-paper-head"><div className="ticket-document-lockup"><img src={routePulseLogo} alt="" /><div><span>ROUTEPULSE TRANSIT · SERVICE NETWORK</span><h2>Intercity Journey Preview</h2><p>Booking reference: {bookingReference}</p></div></div><div className="ticket-status">Demo document</div></div><div className="ticket-route"><div><b>Ahmedabad</b><span>06:30</span><small>Central Bus Terminal · Bay 12</small></div><i /><div><b>Vadodara</b><span>12:20</span><small>Main Transit Depot · Platform 4</small></div></div><div className="ticket-route-schematic"><span className="ticket-station ticket-station-origin"><b>AHM</b><small>Boarding</small></span><i /><span className="ticket-station ticket-station-active"><img src={routePulseLogo} alt="" /><b>RP 420</b><small>Service</small></span><i /><span className="ticket-station ticket-station-destination"><b>VAD</b><small>Arrival</small></span></div><div className="ticket-facts"><span><b>Travel date</b>Sun, 23 Aug 2026</span><span><b>Service</b>RoutePulse Express · RP-420</span><span><b>Passenger</b>{passenger}</span><span><b>Seat</b>{seats}</span><span><b>Fare preview</b>₹513</span><span><b>Booking status</b>Not confirmed</span></div><div className="ticket-verification"><div><ShieldCheck /><span><b>Verification reference</b><small>Use the booking reference in the full service to retrieve a real ticket when integrations are configured.</small></span></div><div className="ticket-qr"><QrCode /><small>Preview code</small></div></div></section><div className="ticket-action-disclosure"><ShieldCheck />All output actions generate or share a sandbox preview only. No real ticket is issued.</div><div className="ticket-actions"><button onClick={() => window.print()}><Printer />Print preview</button><button onClick={downloadDemoPdf}><Download />Download demo PDF</button><button onClick={createSmsDraft}><MessageSquareText />Create SMS draft</button><button onClick={() => navigate("/dashboard")} className="ticket-dashboard-action">View dashboard <ArrowLeft /></button></div></BookingShell>;
}
