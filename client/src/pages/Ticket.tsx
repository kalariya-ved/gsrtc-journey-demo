/** GSRTC Journey Demo design: redesigned passenger ticket document with clear route identity, status, group traveller records, shared contact, and controlled output actions. */
import { ArrowLeft, CheckCircle2, Download, Mail, MessageCircle, MessageSquareText, Phone, Printer, QrCode, ShieldCheck, UsersRound } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { BookingShell } from "@/components/BookingShell";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";
type Traveller = { seat: string; name: string; age: string; gender: string };

function getTravellers(params: URLSearchParams, seats: string[]) {
  try {
    const parsed = JSON.parse(params.get("travellers") || "[]") as Traveller[];
    if (Array.isArray(parsed) && parsed.length === seats.length) return parsed;
  } catch {
    // Keep previous single-passenger preview links working.
  }
  return seats.map((seat) => ({ seat, name: params.get("name") || "Traveller", age: "—", gender: params.get("gender") || "Passenger" }));
}

export default function Ticket() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const seats = (params.get("seats") || "A3").split(",").filter(Boolean);
  const travellers = getTravellers(params, seats);
  const contactMobile = params.get("contactMobile") || "Not provided";
  const contactEmail = params.get("contactEmail") || params.get("email") || "Not provided";
  const bookingReference = "GJ-DEMO-82467";
  const total = travellers.length * 489 + 24;
  const travellerSummary = travellers.map((traveller) => `${traveller.name} · Seat ${traveller.seat}`).join(", ");
  const ticketText = `GSRTC Journey Demo passenger ticket preview\nReference: ${bookingReference}\nAhmedabad 06:30 → Vadodara 12:20\nTravellers: ${travellerSummary}\nTicket contact: ${contactMobile} · ${contactEmail}\nIndependent demo only — not affiliated with GSRTC and not valid for travel.`;

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
    pdf.text("Passenger Journey Preview", 42, 126);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const lines = [
      `Booking reference: ${bookingReference}`,
      "Route: Ahmedabad (06:30) to Vadodara (12:20)",
      "Service: GSRTC Demo Express · GJ-D420 · Volvo AC Seater",
      ...travellers.map((traveller, index) => `Passenger ${index + 1}: ${traveller.name} · ${traveller.gender} · Age ${traveller.age} · Seat ${traveller.seat}`),
      `Ticket contact: ${contactMobile} · ${contactEmail}`,
      `Fare preview: ₹${total}`,
      "Status: Not confirmed — independent demonstration only.",
    ];
    lines.forEach((line, index) => pdf.text(line, 42, 165 + index * 21));
    const noticeY = 185 + lines.length * 21;
    pdf.setFillColor(238, 246, 251);
    pdf.rect(42, noticeY, 510, 74, "F");
    pdf.setTextColor(55, 91, 120);
    pdf.setFontSize(10);
    pdf.text("This independent GSRTC-inspired prototype does not create a booking, reserve a seat,", 56, noticeY + 30);
    pdf.text("collect payment, or grant an entitlement to travel.", 56, noticeY + 50);
    pdf.save(`${bookingReference.toLowerCase()}-preview.pdf`);
    toast.success("Demo ticket PDF downloaded. It is clearly marked as a non-travel preview.");
  };

  const shareSms = () => {
    window.location.href = `sms:?&body=${encodeURIComponent(ticketText)}`;
    navigator.clipboard?.writeText(ticketText).catch(() => undefined);
    toast.success("SMS ticket draft opened. The preview text was also copied where supported.");
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(ticketText)}`, "_blank", "noopener,noreferrer");
    toast.success("WhatsApp opened with the passenger ticket preview.");
  };

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(`GSRTC Journey Demo preview · ${bookingReference}`)}&body=${encodeURIComponent(ticketText)}`;
    toast.success("Email draft prepared with the passenger ticket preview.");
  };

  return (
    <BookingShell step="ticket" eyebrow="Passenger ticket desk" title={`Journey record · ${travellers.length} traveller${travellers.length === 1 ? "" : "s"}`}>
      <div className="ticket-redesign">
        <section className="ticket-command-deck">
          <div className="ticket-command-copy"><span>DEMO TICKET ISSUE DESK</span><h2>Passenger journey record</h2><p>A clear, share-ready summary of this sample journey and its selected seats.</p></div>
          <div className="ticket-command-state"><CheckCircle2 /><span><b>PREVIEW READY</b><small>No reservation issued</small></span></div>
        </section>

        <section className="ticket-redesign-paper">
          <header className="ticket-redesign-header">
            <div className="ticket-redesign-brand"><div className="ticket-redesign-mark"><img src={routePulseLogo} alt="" /></div><div><span>GSRTC JOURNEY DEMO</span><h2>Passenger ticket preview</h2><small>Independent prototype · Demo data</small></div></div>
            <div className="ticket-redesign-reference"><span>PREVIEW REFERENCE</span><strong>{bookingReference}</strong><small>{travellers.length} traveller{travellers.length === 1 ? "" : "s"} · {seats.join(", ")}</small></div>
          </header>

          <section className="ticket-redesign-route" aria-label="Sample journey route">
            <div className="ticket-redesign-stop"><span>BOARDING</span><strong>Ahmedabad</strong><b>06:30</b><small>Central Bus Terminal · Bay 12</small></div>
            <div className="ticket-redesign-route-line"><span className="ticket-route-coach"><img src={routePulseLogo} alt="" /><b>GJ D420</b><small>Sample service</small></span><i /><span className="ticket-route-duration">5h 50m</span><i /></div>
            <div className="ticket-redesign-stop is-arrival"><span>ARRIVAL</span><strong>Vadodara</strong><b>12:20</b><small>Main Transit Depot · Platform 4</small></div>
          </section>

          <div className="ticket-service-strip"><span><b>Travel date</b>Sun, 23 Aug 2026</span><span><b>Service</b>GSRTC Demo Express</span><span><b>Coach</b>Volvo AC Seater</span><span><b>Journey status</b><em>Not confirmed</em></span></div>

          <section className="ticket-passenger-section"><div className="ticket-section-heading"><div><UsersRound /><span><b>Passengers on this preview</b><small>One traveller record for every selected seat</small></span></div><em>{seats.length} seat{seats.length === 1 ? "" : "s"}</em></div><div className="ticket-passenger-grid">{travellers.map((traveller, index) => <article className="ticket-passenger-card" key={`${traveller.seat}-${index}`}><div className="ticket-passenger-number">{String(index + 1).padStart(2, "0")}</div><div><span>PASSENGER {index + 1}</span><strong>{traveller.name}</strong><small>{traveller.gender} · Age {traveller.age}</small></div><b className="ticket-seat-badge">SEAT {traveller.seat}</b></article>)}</div></section>

          <div className="ticket-redesign-bottom"><section className="ticket-contact-panel"><Phone /><div><span>TICKET DELIVERY CONTACT</span><strong>{contactMobile}</strong><small>{contactEmail}</small></div></section><section className="ticket-fare-panel"><span>ILLUSTRATIVE TOTAL</span><strong>₹{total}</strong><small>Sample fare · no payment collected</small></section></div>

          <section className="ticket-redesign-verification"><div className="ticket-verification-seal"><ShieldCheck /><span>DEMO<br />ONLY</span></div><div><b>Independent journey document</b><p>This GSRTC-inspired prototype is not affiliated with GSRTC. It does not create a reservation, reserve a seat, process payment, or grant an entitlement to travel.</p></div><div className="ticket-qr"><QrCode /><small>Preview code</small></div></section>
        </section>

        <section className="ticket-output-desk"><div className="ticket-output-heading"><div><span>DOCUMENT OUTPUT DESK</span><h2>Share or save this preview</h2></div><small>All actions remain demo-only</small></div><div className="ticket-output-grid"><button type="button" onClick={() => window.print()}><Printer /><span><b>Print preview</b><small>Open browser print</small></span></button><button type="button" onClick={downloadDemoPdf}><Download /><span><b>Download PDF</b><small>Save demo document</small></span></button><button type="button" onClick={shareSms}><MessageSquareText /><span><b>SMS ticket</b><small>Open message draft</small></span></button><button type="button" onClick={shareWhatsApp}><MessageCircle /><span><b>WhatsApp ticket</b><small>Share with a contact</small></span></button><button type="button" onClick={shareEmail}><Mail /><span><b>Email ticket</b><small>Open email draft</small></span></button><button type="button" onClick={() => navigate("/dashboard")} className="ticket-output-primary"><span><b>View dashboard</b><small>Return to journeys</small></span><ArrowLeft /></button></div><p className="ticket-output-note"><ShieldCheck />SMS, WhatsApp, email, print, and PDF actions share or generate the preview text/document only. No real passenger ticket is issued.</p></section>
      </div>
    </BookingShell>
  );
}
