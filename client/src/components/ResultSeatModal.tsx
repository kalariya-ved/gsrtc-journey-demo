/**
 * GSRTC Journey Demo design: compact sample-service modal, square seat states, civic blue
 * operational selection, and signal red reserved for the final continuation action.
 */
import { useState } from "react";
import { Armchair, ArrowRight, BusFront, Check, MapPin, TicketCheck, UserRound, X } from "lucide-react";
import type { Service } from "@/pages/SearchResults";

const seatRows: Array<Array<string | null>> = [
  ["A1", "A2", null, "A3", "A4"],
  ["B1", "B2", null, "B3", "B4"],
  ["C1", "C2", null, "C3", "C4"],
  ["D1", "D2", null, "D3", "D4"],
  ["E1", "E2", null, "E3", "E4"],
];

const bookedSeats = new Set(["A1", "A4", "B3", "C2", "D1", "E4"]);
const reservedSeats = new Set(["B4", "D3"]);

export function ResultSeatModal({ service, onClose, onContinue }: { service: Service; onClose: () => void; onContinue: (seats: string[]) => void }) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>(["B2"]);
  const totalFare = selectedSeats.length * service.fare;

  const toggleSeat = (seat: string) => {
    if (bookedSeats.has(seat) || reservedSeats.has(seat)) return;
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]);
  };

  return (
    <div className="results-seat-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="results-seat-modal" role="dialog" aria-modal="true" aria-labelledby="results-seat-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="results-seat-modal-head">
          <div><span><BusFront />Seat selection · {service.id}</span><h2 id="results-seat-title">{service.operator}</h2><p>{service.service} · {service.departure} – {service.arrival}</p></div>
          <button onClick={onClose} aria-label="Close seat selection"><X /></button>
        </div>
        <div className="results-seat-modal-body">
          <section className="results-seat-map-wrap">
            <div className="results-seat-legend"><span><i className="modal-available" />Available</span><span><i className="modal-selected" />Selected</span><span><i className="modal-booked" />Booked</span><span><i className="modal-reserved" />Reserved</span></div>
            <div className="results-coach-map">
              <div className="results-driver-box"><Armchair /><span>Driver</span></div>
              <div className="results-modal-seat-grid">
                {seatRows.flatMap((row, rowIndex) => row.map((seat, cellIndex) => {
                  if (!seat) return <span key={`aisle-${rowIndex}-${cellIndex}`} className="results-seat-aisle" />;
                  const isBooked = bookedSeats.has(seat);
                  const isReserved = reservedSeats.has(seat);
                  const isSelected = selectedSeats.includes(seat);
                  const seatClass = isBooked ? "result-modal-seat is-booked" : isReserved ? "result-modal-seat is-reserved" : isSelected ? "result-modal-seat is-selected" : "result-modal-seat";
                  return <button key={seat} disabled={isBooked || isReserved} onClick={() => toggleSeat(seat)} className={seatClass}><span>{isSelected && <Check />}</span>{seat}</button>;
                }))}
              </div>
            </div>
            <div className="results-seat-points"><label><MapPin />Boarding<select defaultValue="central"><option value="central">Central Bus Terminal · {service.departure}</option><option value="circle">Railway Circle · 15 min earlier</option></select></label><label><MapPin />Dropping<select defaultValue="main"><option value="main">Main Transit Depot · {service.arrival}</option><option value="market">Old Market Terminus · 10 min earlier</option></select></label></div>
          </section>
          <aside className="results-seat-summary">
            <div className="modal-service-chip"><BusFront /><span><b>{service.id}</b><small>{service.seats} seats remaining</small></span></div>
            <div className="modal-selection-count"><span><UserRound />Selected seats</span><strong>{selectedSeats.length ? selectedSeats.join(", ") : "None"}</strong></div>
            <div className="modal-fare"><span><TicketCheck />Fare summary</span><b>₹{service.fare} × {selectedSeats.length || 0}</b><strong>₹{totalFare}</strong></div>
            <button disabled={!selectedSeats.length} onClick={() => onContinue(selectedSeats)} className="modal-continue-button">Continue as demo <ArrowRight /></button>
            <p>This uses a dummy layout. No seat is held or booked until a connected reservation service is available.</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
