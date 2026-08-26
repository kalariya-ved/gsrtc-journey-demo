/** GSRTC Journey Demo design: compact group-ticket preview with direct SMS, WhatsApp, and email sharing of the non-travel document. */
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
  const travellerSummary = travellers.map((traveller) => `${traveller.name} · ${traveller.seat}`).join(", ");
  const ticketText = `GSRTC Journey Demo ticket preview\nReference: ${bookingReference}\nAhmedabad 06:30 → Vadodara 12:20\nTravellers: ${travellerSummary}\nTicket contact: ${contactMobile}\nIndependent demo only — not affiliated with GSRTC and not valid for travel.`;

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
    const lines = [`Booking reference: ${bookingReference}`, "Route: Ahmedabad (06:30) to Vadodara (12:20)", "Service: GSRTC Demo Express · GJ-D420 · Volvo AC Seater", ...travellers.map((traveller, index) => `Passenger ${index + 1}: ${traveller.name} · ${traveller.gender} · Age ${traveller.age} · Seat ${traveller.seat}`), `Ticket contact: ${contactMobile} · ${contactEmail}`, `Fare preview: ₹${travellers.length * 489 + 24}`, "Status: Not confirmed — independent demonstration only."];
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

  const shareSms = () => { window.location.href = `sms:?&body=${encodeURIComponent(ticketText)}`; navigator.clipboard?.writeText(ticketText).catch(() => undefined); toast.success("SMS ticket draft opened. The preview text was also copied where supported."); };
  const shareWhatsApp = () => { window.open(`https://wa.me/?text=${encodeURIComponent(ticketText)}`, "_blank", "noopener,noreferrer"); toast.success("WhatsApp opened with the passenger ticket preview."); };
  const shareEmail = () => { window.location.href = `mailto:?subject=${encodeURIComponent(`GSRTC Journey Demo preview · ${bookingReference}`)}&body=${encodeURIComponent(ticketText)}`; toast.success("Email draft prepared with the passenger ticket preview."); };

  return <BookingShell step="ticket" eyebrow="Sample journey document" title={`Intercity journey preview · ${travellers.length} traveller${travellers.length === 1 ? "" : "s"}`}><div className="ticket-notice"><CheckCircle2 /><span><b>Independent demonstration document.</b><small>It is not affiliated with GSRTC, does not create a reservation, and is not valid for travel.</small></span></div><section className="ticket-paper"><div className="ticket-paper-head"><div className="ticket-document-lockup"><img src={routePulseLogo} alt="" /><div><span>GSRTC JOURNEY DEMO · INDEPENDENT PROTOTYPE</span><h2>Intercity Journey Preview</h2><p>Booking reference: {bookingReference}</p></div></div><div className="ticket-status">Demo document</div></div><div className="ticket-route"><div><b>Ahmedabad</b><span>06:30</span><small>Central Bus Terminal · Bay 12</small></div><i /><div><b>Vadodara</b><span>12:20</span><small>Main Transit Depot · Platform 4</small></div></div><div className="ticket-route-schematic"><span className="ticket-station ticket-station-origin"><b>AHM</b><small>Boarding</small></span><i /><span className="ticket-station ticket-station-active"><img src={routePulseLogo} alt="" /><b>GJ D420</b><small>Sample service</small></span><i /><span className="ticket-station ticket-station-destination"><b>VAD</b><small>Arrival</small></span></div><div className="ticket-facts"><span><b>Travel date</b>Sun, 23 Aug 2026</span><span><b>Sample service</b>GSRTC Demo Express · GJ-D420</span><span><b>Travellers</b>{travellers.length} passenger{travellers.length === 1 ? "" : "s"}</span><span><b>Seats</b>{seats.join(", ")}</span><span><b>Fare preview</b>₹{travellers.length * 489 + 24}</span><span><b>Booking status</b>Not confirmed</span></div><section className="ticket-passenger-list"><div><UsersRound /><span><b>Traveller records</b><small>One record for each selected seat</small></span></div>{travellers.map((traveller, index) => <p key={`${traveller.seat}-${index}`}><b>Passenger {index + 1}</b><span>{traveller.name}</span><small>{traveller.gender} · Age {traveller.age} · Seat {traveller.seat}</small></p>)}</section><div className="ticket-contact"><Phone /><span><b>Ticket delivery contact</b><small>{contactMobile} · {contactEmail}</small></span></div><div className="ticket-verification"><div><ShieldCheck /><span><b>Preview reference</b><small>A real ticket can only be retrieved after authorised operator integrations are configured.</small></span></div><div className="ticket-qr"><QrCode /><small>Preview code</small></div></div></section><div className="ticket-action-disclosure"><ShieldCheck />All output actions generate or share a passenger ticket preview only. No real ticket is issued.</div><div className="ticket-actions"><button onClick={() => window.print()}><Printer />Print preview</button><button onClick={downloadDemoPdf}><Download />Download demo PDF</button><button onClick={shareSms}><MessageSquareText />SMS ticket</button><button onClick={shareWhatsApp}><MessageCircle />WhatsApp ticket</button><button onClick={shareEmail}><Mail />Email ticket</button><button onClick={() => navigate("/dashboard")} className="ticket-dashboard-action">View dashboard <ArrowLeft /></button></div></BookingShell>;
}
