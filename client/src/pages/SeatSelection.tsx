/** Civic Transit Portal design: practical coach-seat map, square status symbols, blue operational states, and red continuation action. */
import { useMemo, useState } from "react";
import { ArrowRight, Armchair, Check, UserRound } from "lucide-react";
import { useLocation } from "wouter";
import { BookingShell, JourneyMiniCard } from "@/components/BookingShell";

const seats = ["A1", "A2", "A3", "A4", "A5", "A6", "B1", "B2", "B3", "B4", "B5", "B6", "C1", "C2", "C3", "C4", "C5", "C6", "D1", "D2", "D3", "D4", "D5", "D6", "E1", "E2", "E3", "E4"];
const occupied = new Set(["A1", "A5", "B4", "B5", "C2", "C6", "D1", "D4", "E3"]);
const reserved = new Set(["A4", "C4", "D5"]);

export default function SeatSelection() {
  const [, navigate] = useLocation();
  const [selected, setSelected] = useState<string[]>(["A3"]);
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const queryBase = `service=${encodeURIComponent(params.get("service") || "RP-420")}&source=${encodeURIComponent(params.get("source") || "Ahmedabad")}&destination=${encodeURIComponent(params.get("destination") || "Vadodara")}&date=${encodeURIComponent(params.get("date") || "2026-08-23")}&passengers=${encodeURIComponent(params.get("passengers") || "1")}`;
  const price = selected.length * 489;
  const toggleSeat = (seat: string) => { if (!occupied.has(seat) && !reserved.has(seat)) setSelected((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]); };
  return <BookingShell step="seats" eyebrow="Seat selection" title="Choose your preferred seat">
    <div className="seat-layout"><section className="seat-map-panel"><div className="seat-panel-heading"><div><h2>Lower deck</h2><p>Tap an available seat to add it to your journey.</p></div><div className="seat-legend"><span><i className="legend-available" />Available</span><span><i className="legend-selected" />Selected</span><span><i className="legend-occupied" />Booked</span><span><i className="legend-reserved" />Reserved</span></div></div><div className="coach-map"><div className="driver-box"><Armchair /><span>Driver</span></div><div className="seat-grid">{seats.map((seat, index) => <button key={seat} disabled={occupied.has(seat) || reserved.has(seat)} onClick={() => toggleSeat(seat)} className={occupied.has(seat) ? "coach-seat is-occupied" : reserved.has(seat) ? "coach-seat is-reserved" : selected.includes(seat) ? "coach-seat is-selected" : "coach-seat"} style={{ gridColumn: index % 6 === 2 ? 4 : undefined }}><span>{selected.includes(seat) && <Check />}</span>{seat}</button>)}</div></div></section><aside className="seat-summary-card"><JourneyMiniCard seats={selected.join(", ") || "—"} /><div className="seat-count"><span><UserRound />Selected seats</span><strong>{selected.length || "No"}</strong></div><div className="seat-price"><span>Seat fare</span><strong>₹{price}</strong></div><button disabled={!selected.length} onClick={() => navigate(`/passengers?${queryBase}&seats=${encodeURIComponent(selected.join(","))}`)} className="primary-booking-button">Continue <ArrowRight /></button><p>Review passenger details before payment.</p></aside></div>
  </BookingShell>;
}
