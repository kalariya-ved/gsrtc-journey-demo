/** Civic Transit Portal design: formal form groups, descriptive labels, clear rule lines, and task-led travel confirmation. */
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Phone, UserRound } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { BookingShell, JourneyMiniCard } from "@/components/BookingShell";

export default function PassengerDetails() {
  const [, navigate] = useLocation();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Female");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const seats = params.get("seats") || "A3";
  const base = `service=${encodeURIComponent(params.get("service") || "GJ-D420")}&source=${encodeURIComponent(params.get("source") || "Ahmedabad")}&destination=${encodeURIComponent(params.get("destination") || "Vadodara")}&date=${encodeURIComponent(params.get("date") || "2026-08-23")}&passengers=${encodeURIComponent(params.get("passengers") || "1")}&seats=${encodeURIComponent(seats)}`;
  const continueToReview = () => { if (!name || !age || !mobile || !email || !accepted) { toast.error("Complete the passenger details and accept the journey terms."); return; } navigate(`/review?${base}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&gender=${encodeURIComponent(gender)}`); };
  return <BookingShell step="passengers" eyebrow="Passenger information" title="Add traveller details"><div className="passenger-layout"><form className="passenger-form-panel" onSubmit={(event) => { event.preventDefault(); continueToReview(); }}><div className="form-section-heading"><div><UserRound /><span><b>Passenger 1</b><small>Details must match a valid travel identity document.</small></span></div><span className="seat-pill">Seat {seats}</span></div><div className="form-grid"><label>Full name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter passenger name" /></label><label>Age<input value={age} onChange={(event) => setAge(event.target.value.replace(/\D/g, "").slice(0, 2))} inputMode="numeric" placeholder="Age" /></label><label>Gender<select value={gender} onChange={(event) => setGender(event.target.value)}><option>Female</option><option>Male</option><option>Prefer not to say</option></select></label></div><div className="contact-form-section"><h2>Contact for journey updates</h2><div className="form-grid"><label><span><Phone />Mobile number</span><input value={mobile} onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="numeric" placeholder="10-digit mobile number" /></label><label><span><Mail />Email address</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@example.com" /></label></div></div><label className="terms-check"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} /><span><CheckCircle2 /></span>I confirm that the passenger details are correct and I accept the journey terms.</label><button className="primary-booking-button form-submit" type="submit">Review booking <ArrowRight /></button></form><aside><JourneyMiniCard seats={seats} /><div className="passenger-note"><b>Why these details matter</b><p>They are used for your booking preview, trip updates, and ticket retrieval.</p></div></aside></div></BookingShell>;
}
