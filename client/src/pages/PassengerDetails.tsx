/** GSRTC Journey Demo design: one structured traveller record per selected seat with a single shared ticket-contact channel. */
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Phone, UserRound } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { BookingShell, JourneyMiniCard } from "@/components/BookingShell";

type Traveller = { seat: string; name: string; age: string; gender: string };

export default function PassengerDetails() {
  const [, navigate] = useLocation();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const seats = params.get("seats") || "A3";
  const selectedSeats = useMemo(() => seats.split(",").map((seat) => seat.trim()).filter(Boolean), [seats]);
  const passengerCount = Math.max(1, Number.parseInt(params.get("passengers") || "1", 10) || 1);
  const [travellers, setTravellers] = useState<Traveller[]>(() => selectedSeats.map((seat) => ({ seat, name: "", age: "", gender: "Female" })));
  const [contactMobile, setContactMobile] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const isSeatCountValid = selectedSeats.length === passengerCount;
  const base = `service=${encodeURIComponent(params.get("service") || "GJ-D420")}&source=${encodeURIComponent(params.get("source") || "Ahmedabad")}&destination=${encodeURIComponent(params.get("destination") || "Vadodara")}&date=${encodeURIComponent(params.get("date") || "2026-08-23")}&passengers=${encodeURIComponent(String(passengerCount))}&seats=${encodeURIComponent(seats)}`;

  const updateTraveller = (index: number, field: keyof Omit<Traveller, "seat">, value: string) => {
    setTravellers((current) => current.map((traveller, travellerIndex) => travellerIndex === index ? { ...traveller, [field]: value } : traveller));
  };

  const continueToReview = () => {
    if (!isSeatCountValid) {
      toast.error(`Select exactly ${passengerCount} seat${passengerCount === 1 ? "" : "s"} before adding traveller details.`);
      return;
    }
    if (travellers.some((traveller) => !traveller.name.trim() || !traveller.age)) {
      toast.error("Complete the name and age for every traveller.");
      return;
    }
    if (contactMobile.length !== 10 || !contactEmail || !accepted) {
      toast.error("Add one valid ticket contact and accept the journey terms.");
      return;
    }
    const payload = encodeURIComponent(JSON.stringify(travellers));
    navigate(`/review?${base}&travellers=${payload}&contactMobile=${encodeURIComponent(contactMobile)}&contactEmail=${encodeURIComponent(contactEmail)}`);
  };

  return <BookingShell step="passengers" eyebrow="Traveller information" title={`Add details for ${passengerCount} traveller${passengerCount === 1 ? "" : "s"}`}>
    <div className="passenger-layout"><form className="passenger-form-panel" onSubmit={(event) => { event.preventDefault(); continueToReview(); }}><div className="form-section-heading"><div><UserRound /><span><b>Traveller details</b><small>Each selected seat requires one traveller record.</small></span></div><span className="seat-pill">{selectedSeats.length} of {passengerCount} seats</span></div>{!isSeatCountValid && <div className="seat-count-alert">Your selected seats do not match the journey passenger count. Return to seat selection and choose exactly {passengerCount} seat{passengerCount === 1 ? "" : "s"}.</div>}<div className="group-traveller-list">{travellers.map((traveller, index) => <section className="group-traveller-card" key={traveller.seat}><div className="group-traveller-head"><span><b>Passenger {index + 1}</b><small>Identity details for the booking preview</small></span><strong>Seat {traveller.seat}</strong></div><div className="form-grid"><label>Full name<input value={traveller.name} onChange={(event) => updateTraveller(index, "name", event.target.value)} placeholder="Enter passenger name" /></label><label>Age<input value={traveller.age} onChange={(event) => updateTraveller(index, "age", event.target.value.replace(/\D/g, "").slice(0, 2))} inputMode="numeric" placeholder="Age" /></label><label>Gender<select value={traveller.gender} onChange={(event) => updateTraveller(index, "gender", event.target.value)}><option>Female</option><option>Male</option><option>Prefer not to say</option></select></label></div></section>)}</div><div className="contact-form-section"><h2>One contact for ticket delivery</h2><p>Use one mobile number and one email address for the e-ticket and journey updates. Individual traveller forms do not require separate contacts.</p><div className="form-grid"><label><span><Phone />Mobile number</span><input value={contactMobile} onChange={(event) => setContactMobile(event.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="numeric" placeholder="10-digit mobile number" /></label><label><span><Mail />Email address</span><input value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} type="email" placeholder="name@example.com" /></label></div></div><label className="terms-check"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} /><span><CheckCircle2 /></span>I confirm that every traveller detail is correct and I accept the journey terms.</label><button className="primary-booking-button form-submit" disabled={!isSeatCountValid} type="submit">Review {passengerCount} traveller{passengerCount === 1 ? "" : "s"} <ArrowRight /></button></form><aside><JourneyMiniCard seats={seats} /><div className="passenger-note"><b>One ticket contact</b><p>The shared mobile number and email are used for the ticket preview, journey updates, and retrieval.</p></div></aside></div>
  </BookingShell>;
}
