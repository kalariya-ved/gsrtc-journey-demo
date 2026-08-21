/** Civic Transit Portal design: formal confirmation summary, price rules, boxed policy text, and clear payment handoff. */
import { ArrowRight, CheckCircle2, CreditCard, ShieldCheck, TicketCheck } from "lucide-react";
import { useLocation } from "wouter";
import { BookingShell, JourneyMiniCard } from "@/components/BookingShell";

export default function BookingReview() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const seats = params.get("seats") || "A3";
  const seatCount = seats.split(",").filter(Boolean).length;
  const base = window.location.search.replace(/^\?/, "");
  const fare = seatCount * 489;
  const serviceCharge = 24;
  return <BookingShell step="review" eyebrow="Booking review" title="Confirm your journey details"><div className="review-layout"><section className="review-panel"><div className="review-status"><CheckCircle2 /><span><b>All key journey details are ready to review.</b><small>Confirm the traveller information before moving to the sandbox payment preview.</small></span></div><div className="review-block"><h2>Journey</h2><div className="review-route"><div><b>Ahmedabad</b><span>06:30 · Central Bus Terminal</span></div><i /><div><b>Vadodara</b><span>12:20 · Main Transit Depot</span></div></div><div className="review-trip-meta"><span>Sun, 23 Aug 2026</span><span>RoutePulse Express · RP-420</span><span>Volvo AC Seater</span></div></div><div className="review-block"><h2>Passenger</h2><div className="passenger-review"><TicketCheck /><div><b>{params.get("name") || "Traveller"}</b><span>{params.get("gender") || "Passenger"} · Seat {seats}</span><small>{params.get("email") || "Email not provided"}</small></div></div></div><div className="policy-review"><ShieldCheck /><div><b>Cancellation note</b><p>Cancellations are subject to service policy and the scheduled departure time. This demo journey does not process real cancellations or refunds.</p></div></div></section><aside className="review-price-card"><JourneyMiniCard seats={seats} /><div className="price-lines"><span>Seat fare ({seatCount} × ₹489)<b>₹{fare}</b></span><span>Service charge<b>₹{serviceCharge}</b></span><span className="price-total">Total payable<b>₹{fare + serviceCharge}</b></span></div><button onClick={() => navigate(`/payment?${base}`)} className="primary-booking-button">Continue to payment <ArrowRight /></button><p><CreditCard />You will enter a clearly labelled sandbox payment preview.</p></aside></div></BookingShell>;
}
