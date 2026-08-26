/** GSRTC Journey Demo design: redesigned passenger ticket document with clear route identity, status, group traveller records, shared contact, and controlled output actions. */
import { ArrowLeft, CheckCircle2, Download, Mail, MessageCircle, MessageSquareText, Phone, Printer, QrCode, ShieldCheck, UsersRound } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { BookingShell } from "@/components/BookingShell";
import { buildTicketShareText } from "@/lib/ticketContent";

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
  const ticketText = buildTicketShareText({ reference: bookingReference, source: "Ahmedabad", destination: "Vadodara", departure: "06:30", arrival: "12:20", travellers: travellers.map((traveller) => ({ name: traveller.name, seat: traveller.seat })), contactMobile, contactEmail });

  const downloadDemoPdf = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = 595;
    const margin = 32;
    const contentWidth = pageWidth - margin * 2;
    const from = params.get("source") || "Ahmedabad";
    const destination = params.get("destination") || "Vadodara";
    const travelDate = (params.get("date") || "2026-08-23").replaceAll("-", "/");
    const drawRule = (y: number, color = [158, 174, 187] as [number, number, number]) => {
      pdf.setDrawColor(...color);
      pdf.setLineWidth(.7);
      pdf.line(margin, y, pageWidth - margin, y);
    };
    const drawSectionBar = (title: string, y: number) => {
      pdf.setFillColor(226, 232, 236);
      pdf.rect(margin, y, contentWidth, 18, "F");
      pdf.setTextColor(35, 51, 63);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.5);
      pdf.text(title, pageWidth / 2, y + 12, { align: "center" });
      return y + 18;
    };
    const drawField = (label: string, value: string, x: number, y: number, width: number, align: "left" | "right" = "left") => {
      pdf.setTextColor(83, 94, 103);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(6.8);
      pdf.text(label.toUpperCase(), align === "right" ? x + width : x, y, { align });
      pdf.setTextColor(25, 42, 55);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.4);
      const valueLines = pdf.splitTextToSize(value, width);
      pdf.text(valueLines, align === "right" ? x + width : x, y + 10, { align });
    };
    const drawTableCell = (value: string, x: number, y: number, width: number, bold = false, align: "left" | "center" | "right" = "left") => {
      pdf.setTextColor(32, 47, 58);
      pdf.setFont("helvetica", bold ? "bold" : "normal");
      pdf.setFontSize(7.5);
      pdf.text(value, align === "center" ? x + width / 2 : align === "right" ? x + width - 4 : x + 4, y, { align });
    };

    pdf.setFillColor(18, 56, 84);
    pdf.rect(0, 0, pageWidth, 66, "F");
    pdf.setFillColor(255, 255, 255);
    pdf.circle(54, 33, 20, "S");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("GJ", 54, 37, { align: "center" });
    pdf.setFontSize(16);
    pdf.text("GSRTC JOURNEY DEMO", pageWidth / 2, 29, { align: "center" });
    pdf.setFontSize(7.5);
    pdf.text("INDEPENDENT INTERCITY SERVICE - DEMO DATA", pageWidth / 2, 43, { align: "center" });

    let y = 88;
    pdf.setTextColor(23, 43, 58);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("PASSENGER TICKET / JOURNEY VOUCHER", pageWidth / 2, y, { align: "center" });
    pdf.setFontSize(7.2);
    pdf.setTextColor(104, 112, 119);
    pdf.text("Independent preview document - not valid for travel", pageWidth / 2, y + 13, { align: "center" });
    y += 31;
    drawRule(y, [63, 80, 91]);

    y = drawSectionBar("BOOKING DETAILS", y + 10) + 7;
    drawField("Boarding from - date & time", `${from.toUpperCase()} - ${travelDate} - 06:30 Hrs`, margin + 5, y, 245);
    drawField("Arrival - date & time", `${destination.toUpperCase()} - ${travelDate} - 12:20 Hrs`, margin + 285, y, 245, "right");
    y += 34;
    drawRule(y);
    y += 15;
    drawField("Preview reference", bookingReference, margin + 5, y, 150);
    drawField("Route name", `${from.toUpperCase()} TO ${destination.toUpperCase()}`, margin + 175, y, 210);
    drawField("Service class", "EXPRESS - AC SEATER", margin + 405, y, 125, "right");
    y += 34;
    drawRule(y);
    y += 15;
    drawField("Quota", "GENERAL DEMO", margin + 5, y, 135);
    drawField("Distance", "Illustrative route", margin + 175, y, 140);
    drawField("Generated", "Demo session", margin + 350, y, 180, "right");
    y += 32;

    y = drawSectionBar("PASSENGER DETAILS", y + 3) + 18;
    const columns = [margin, margin + 42, margin + 284, margin + 344, margin + 397, margin + 470, pageWidth - margin];
    pdf.setFillColor(239, 242, 244);
    pdf.rect(margin, y - 14, contentWidth, 17, "F");
    ["Sr. No", "Passenger Name", "Age", "Seat", "Gender", "ID Card No"].forEach((heading, index) => drawTableCell(heading, columns[index], y - 3, columns[index + 1] - columns[index], true, index === 0 ? "center" : "left"));
    y += 12;
    travellers.forEach((traveller, index) => {
      const rowY = y;
      drawTableCell(String(index + 1), columns[0], rowY, columns[1] - columns[0], false, "center");
      drawTableCell(traveller.name || "Traveller", columns[1], rowY, columns[2] - columns[1]);
      drawTableCell(traveller.age || "—", columns[2], rowY, columns[3] - columns[2], false, "center");
      drawTableCell(traveller.seat, columns[3], rowY, columns[4] - columns[3], true, "center");
      drawTableCell(traveller.gender || "Passenger", columns[4], rowY, columns[5] - columns[4]);
      drawTableCell("—", columns[5], rowY, columns[6] - columns[5]);
      drawRule(y + 6, [207, 214, 219]);
      y += 20;
    });
    y += 4;

    y = drawSectionBar("PAYMENT DETAILS", y) + 17;
    drawField("Basic fare", `INR ${travellers.length * 489}.00`, margin + 20, y, 190);
    drawField("Reservation fee", "INR 0.00", margin + 300, y, 190, "right");
    y += 25;
    drawField("Service / demo charge", "INR 24.00", margin + 20, y, 190);
    drawField("GST / other levies", "INR 0.00", margin + 300, y, 190, "right");
    y += 25;
    drawRule(y - 8, [63, 80, 91]);
    pdf.setTextColor(23, 43, 58);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    pdf.text(`ILLUSTRATIVE TOTAL: INR ${total}`, pageWidth / 2, y + 5, { align: "center" });
    y += 24;

    y = drawSectionBar("TICKET CONTACT & DELIVERY", y) + 17;
    drawField("Mobile number", contactMobile, margin + 20, y, 190);
    drawField("Email address", contactEmail, margin + 300, y, 190, "right");
    y += 31;

    y = drawSectionBar("GENERAL INSTRUCTIONS", y) + 16;
    const instructions = [
      "This is an independent GSRTC-inspired prototype document and is not affiliated with GSRTC.",
      "The preview does not create a reservation, hold a seat, collect payment, or grant travel entitlement.",
      "Real boarding, cancellation, refund, payment, and ticket retrieval require an authorised operator connection.",
      "Keep the traveller names and seat numbers consistent when testing the group-booking flow.",
    ];
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.2);
    pdf.setTextColor(54, 68, 78);
    instructions.forEach((instruction) => {
      const wrapped = pdf.splitTextToSize(instruction, contentWidth - 22);
      pdf.text("-", margin + 4, y);
      pdf.text(wrapped, margin + 14, y);
      y += wrapped.length * 9 + 5;
    });

    y += 4;
    pdf.setFillColor(231, 241, 247);
    pdf.rect(margin, y, contentWidth, 58, "F");
    pdf.setDrawColor(7, 95, 156);
    pdf.setLineWidth(2);
    pdf.line(margin, y, margin, y + 58);
    pdf.setTextColor(7, 78, 126);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.text("DEMO DOCUMENT - NOT VALID FOR TRAVEL", margin + 14, y + 20);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.2);
    pdf.setTextColor(66, 93, 111);
    pdf.text("Generated by GSRTC Journey Demo. No real ticket, reservation, or payment is issued.", margin + 14, y + 35);
    pdf.text("Use the web app's authorised integration only when the operator and payment provider are connected.", margin + 14, y + 47);
    pdf.setTextColor(112, 122, 129);
    pdf.setFontSize(6.5);
    pdf.text("Printed from an independent passenger-app prototype", pageWidth / 2, 816, { align: "center" });
    pdf.save(`${bookingReference.toLowerCase()}-voucher-preview.pdf`);
    toast.success("Structured demo voucher PDF downloaded. It is clearly marked as a non-travel preview.");
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
