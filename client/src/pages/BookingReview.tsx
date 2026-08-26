/** GSRTC Journey Demo design: formal group-journey review with individual traveller records and one ticket-delivery contact. */
import { ArrowRight, CheckCircle2, CreditCard, Mail, Phone, ShieldCheck, TicketCheck } from "lucide-react";
import { useLocation } from "wouter";
import { BookingShell, JourneyMiniCard } from "@/components/BookingShell";

type Traveller = { seat: string; name: string; age: string; gender: string };

function getTravellers(params: URLSearchParams, seats: string[]) {
  try {
    const parsed = JSON.parse(params.get("travellers") || "[]") as Traveller[];
    if (Array.isArray(parsed) && parsed.length === seats.length) return parsed;
  } catch {
    // The fallback retains compatibility with existing single-passenger preview links.
  }
  return seats.map((seat) => ({ seat, name: params.get("name") || "Traveller", age: "—", gender: params.get("gender") || "Passenger" }));
}

export default function BookingReview() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const seats = (params.get("seats") || "A3").split(",").filter(Boolean);
  const travellers = getTravellers(params, seats);
  const contactMobile = params.get("contactMobile") || "Not provided";
  const contactEmail = params.get("contactEmail") || params.get("email") || "Not provided";
  const base = window.location.search.replace(/^\?/, "");
  const fare = seats.length * 489;
  const serviceCharge = 24;
  return <BookingShell step="review" eyebrow="Journey review" title={`Confirm ${travellers.length} traveller${travellers.length === 1 ? "" : "s"}`}><div className="review-layout"><section className="review-panel"><div className="review-status"><CheckCircle2 /><span><b>All traveller records are ready to review.</b><small>Every selected seat has a traveller record; one shared contact receives the ticket preview.</small></span></div><div className="review-block"><h2>Sample journey</h2><div className="review-route"><div><b>Ahmedabad</b><span>06:30 · Central Bus Terminal</span></div><i /><div><b>Vadodara</b><span>12:20 · Main Transit Depot</span></div></div><div className="review-trip-meta"><span>Sun, 23 Aug 2026</span><span>GSRTC Demo Express · GJ-D420</span><span>Volvo AC Seater</span></div></div><div className="review-block"><h2>Travellers · {travellers.length}</h2><div className="review-traveller-list">{travellers.map((traveller, index) => <div className="review-traveller-row" key={`${traveller.seat}-${index}`}><TicketCheck /><div><b>Passenger {index + 1} · {traveller.name}</b><span>{traveller.gender} · Age {traveller.age} · Seat {traveller.seat}</span></div></div>)}</div></div><div className="review-contact"><div><Phone /><span><b>Ticket contact</b><small>{contactMobile}</small></span></div><div><Mail /><span><b>Ticket email</b><small>{contactEmail}</small></span></div></div><div className="policy-review"><ShieldCheck /><div><b>Independent-demo notice</b><p>This GSRTC-inspired prototype does not process reservations, cancellations, refunds, or payments. Operator features require an authorised connection.</p></div></div></section><aside className="review-price-card"><JourneyMiniCard seats={seats.join(", ")} /><div className="price-lines"><span>Sample seat fare ({seats.length} × ₹489)<b>₹{fare}</b></span><span>Sample service charge<b>₹{serviceCharge}</b></span><span className="price-total">Illustrative total<b>₹{fare + serviceCharge}</b></span></div><button onClick={() => navigate(`/payment?${base}`)} className="primary-booking-button">Continue to demo preview <ArrowRight /></button><p><CreditCard />You will enter a clearly labelled, non-transactional payment preview.</p></aside></div></BookingShell>;
}
