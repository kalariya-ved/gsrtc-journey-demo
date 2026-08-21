/** Civic Transit Portal design: structured service facts, strong route bands, visible rules, and direct task actions. */
import { ArrowRight, BusFront, CalendarDays, Check, Clock3, Coffee, MapPin, ShieldCheck, Snowflake, Wifi } from "lucide-react";
import { useLocation } from "wouter";
import { BookingShell, JourneyMiniCard } from "@/components/BookingShell";

export default function BusDetails() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service") || "RP-420";
  const source = params.get("source") || "Ahmedabad";
  const destination = params.get("destination") || "Vadodara";
  const date = params.get("date") || "2026-08-23";
  const passenger = params.get("passengers") || "1";
  const query = `service=${encodeURIComponent(service)}&source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&passengers=${encodeURIComponent(passenger)}`;

  return <BookingShell step="details" eyebrow="Service details" title="RoutePulse Express · Volvo AC Seater">
    <div className="details-layout">
      <section className="service-detail-panel">
        <div className="service-detail-banner"><div><span>Service ID: {service}</span><h2>Comfortable intercity travel with live route support.</h2></div><BusFront /></div>
        <div className="detail-timing-row"><div><strong>06:30</strong><span>{source}</span><small>Central Bus Terminal · Bay 12</small></div><div className="detail-duration"><i /><span><Clock3 />5h 50m</span><i /><small>1 scheduled rest stop</small></div><div><strong>12:20</strong><span>{destination}</span><small>Main Transit Depot · Platform 4</small></div></div>
        <div className="detail-section"><h3>Journey information</h3><div className="fact-grid"><span><CalendarDays />Sun, 23 Aug 2026</span><span><Snowflake />Air-conditioned coach</span><span><ShieldCheck />23 seats currently available</span><span><MapPin />Live service tracking enabled</span></div></div>
        <div className="detail-section"><h3>Onboard facilities</h3><div className="facility-grid"><span><Wifi />USB charging</span><span><Coffee />Water bottle</span><span><Check />Reclining seats</span><span><ShieldCheck />Verified crew</span></div></div>
        <div className="detail-section"><h3>Stops on this service</h3><div className="stops-line"><div><i />{source}<small>06:30 · Boarding</small></div><div><i />Anand Bypass<small>08:55 · 10 minute halt</small></div><div><i />{destination}<small>12:20 · Dropping</small></div></div></div>
      </section>
      <aside className="details-booking-card"><JourneyMiniCard /><div className="fare-summary"><span>Fare per passenger</span><strong>₹489</strong><small>Inclusive of applicable fees</small></div><button onClick={() => navigate(`/seats?${query}`)} className="primary-booking-button">Choose seats <ArrowRight /></button><p>Seats will be reserved for a limited time after you continue.</p></aside>
    </div>
  </BookingShell>;
}
