/** GSRTC Journey Demo design: compact sample-ticket preview, formal journey facts, and clearly marked non-travel status. */
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Download, Mail, MessageCircle, MessageSquareText, Printer, QrCode, Share2, ShieldCheck, X } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { BookingShell } from "@/components/BookingShell";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

export default function Ticket() {
  const [, navigate] = useLocation();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const seats = params.get("seats") || "A3";
  const passenger = params.get("name") || "Traveller";
  const bookingReference = "GJ-DEMO-82467";
  const ticketText = `GSRTC Journey Demo ticket preview\nReference: ${bookingReference}\nAhmedabad 06:30 → Vadodara 12:20\nPassenger: ${passenger}\nSeat: ${seats}\nIndependent demo only — not affiliated with GSRTC and not valid for travel.`;

  const downloadDemoPdf = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    pdf.setFillColor(6, 78, 139);
    pdf.rect(0, 0, 595, 82, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("GSRTC JOURNEY DEMO", 42, 47);
    pdf.setFontSize(9);
    pdf.text("INDEPENDENT TICKET PREVIEW — NOT VALID FOR TRAVEL", 42, 64);
    pdf.setTextColor(22, 57, 87);
    pdf.setFontSize(18);
    pdf.text("Intercity Journey Preview", 42, 126);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    [
      `Booking reference: ${bookingReference}`,
      "Route: Ahmedabad (06:30) to Vadodara (12:20)",
      "Service: GSRTC Demo Express · GJ-D420 · Volvo AC Seater",
      `Passenger: ${passenger}`,
      `Selected seat(s): ${seats}`,
      "Fare preview: ₹513",
      "Status: Not confirmed — independent demonstration only.",
    ].forEach((line, index) => pdf.text(line, 42, 165 + index * 24));
    pdf.setFillColor(238, 246, 251);
    pdf.rect(42, 364, 510, 74, "F");
    pdf.setTextColor(55, 91, 120);
    pdf.setFontSize(10);
    pdf.text("This independent GSRTC-inspired prototype does not create a booking, reserve a seat,", 56, 394);
    pdf.text("collect payment, or grant an entitlement to travel.", 56, 414);
    pdf.save(`${bookingReference.toLowerCase()}-preview.pdf`);
    toast.success("Demo ticket PDF downloaded. It is clearly marked as a non-travel preview.");
  };

  const createSmsDraft = () => {
    window.location.href = `sms:?&body=${encodeURIComponent(ticketText)}`;
    navigator.clipboard?.writeText(ticketText).catch(() => undefined);
    toast.success("Demo SMS draft prepared. The text was also copied where supported.");
  };

  const shareText = `GSRTC Journey Demo preview\nReference: ${bookingReference}\nAhmedabad 06:30 → Vadodara 12:20\nPassenger: ${passenger}\nSeat: ${seats}\nIndependent demo only — not affiliated with GSRTC and not valid for travel.`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
    setIsShareOpen(false);
    toast.success("WhatsApp share opened with the demo ticket preview.");
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(`GSRTC Journey Demo preview · ${bookingReference}`)}&body=${encodeURIComponent(shareText)}`;
    setIsShareOpen(false);
    toast.success("Email draft prepared with the demo ticket preview.");
  };

  return (
    <BookingShell step="ticket" eyebrow="Sample journey document" title="Intercity journey preview">
      <div className="ticket-notice"><CheckCircle2 /><span><b>Independent demonstration document.</b><small>It is not affiliated with GSRTC, does not create a reservation, and is not valid for travel.</small></span></div>
      <section className="ticket-paper">
        <div className="ticket-paper-head"><div className="ticket-document-lockup"><img src={routePulseLogo} alt="" /><div><span>GSRTC JOURNEY DEMO · INDEPENDENT PROTOTYPE</span><h2>Intercity Journey Preview</h2><p>Booking reference: {bookingReference}</p></div></div><div className="ticket-status">Demo document</div></div>
        <div className="ticket-route"><div><b>Ahmedabad</b><span>06:30</span><small>Central Bus Terminal · Bay 12</small></div><i /><div><b>Vadodara</b><span>12:20</span><small>Main Transit Depot · Platform 4</small></div></div>
        <div className="ticket-route-schematic"><span className="ticket-station ticket-station-origin"><b>AHM</b><small>Boarding</small></span><i /><span className="ticket-station ticket-station-active"><img src={routePulseLogo} alt="" /><b>GJ D420</b><small>Sample service</small></span><i /><span className="ticket-station ticket-station-destination"><b>VAD</b><small>Arrival</small></span></div>
        <div className="ticket-facts"><span><b>Travel date</b>Sun, 23 Aug 2026</span><span><b>Sample service</b>GSRTC Demo Express · GJ-D420</span><span><b>Passenger</b>{passenger}</span><span><b>Seat</b>{seats}</span><span><b>Fare preview</b>₹513</span><span><b>Booking status</b>Not confirmed</span></div>
        <div className="ticket-verification"><div><ShieldCheck /><span><b>Preview reference</b><small>A real ticket can only be retrieved after authorised operator integrations are configured.</small></span></div><div className="ticket-qr"><QrCode /><small>Preview code</small></div></div>
      </section>
      <div className="ticket-action-disclosure"><ShieldCheck />All output actions generate or share a sample document only. No real ticket is issued.</div>
      <div className="ticket-actions">
        <button onClick={() => window.print()}><Printer />Print preview</button>
        <button onClick={downloadDemoPdf}><Download />Download demo PDF</button>
        <button onClick={createSmsDraft}><MessageSquareText />Create SMS draft</button>
        <div className="ticket-share-wrap"><button onClick={() => setIsShareOpen((current) => !current)} aria-expanded={isShareOpen} aria-controls="ticket-share-menu"><Share2 />Share ticket</button>{isShareOpen && <div id="ticket-share-menu" className="ticket-share-menu" role="menu"><div><span>Share sample preview</span><button onClick={() => setIsShareOpen(false)} aria-label="Close share options"><X /></button></div><p>The shared message states that this is not a valid travel ticket.</p><button role="menuitem" onClick={shareWhatsApp}><MessageCircle />Share via WhatsApp</button><button role="menuitem" onClick={shareEmail}><Mail />Share via email</button></div>}</div>
        <button onClick={() => navigate("/dashboard")} className="ticket-dashboard-action">View dashboard <ArrowLeft /></button>
      </div>
    </BookingShell>
  );
}
