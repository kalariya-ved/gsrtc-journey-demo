export type TicketShareTraveller = { name: string; seat: string };

export type TicketShareData = {
  reference: string;
  source: string;
  destination: string;
  departure: string;
  arrival: string;
  travellers: TicketShareTraveller[];
  contactMobile: string;
  contactEmail: string;
};

export function buildTicketShareText({ reference, source, destination, departure, arrival, travellers, contactMobile, contactEmail }: TicketShareData) {
  const passengerSummary = travellers.map((traveller) => `${traveller.name} · Seat ${traveller.seat}`).join(", ");
  return `GSRTC Journey Demo passenger ticket preview\nReference: ${reference}\n${source} ${departure} → ${destination} ${arrival}\nTravellers: ${passengerSummary}\nTicket contact: ${contactMobile} · ${contactEmail}\nIndependent demo only — not affiliated with GSRTC and not valid for travel.`;
}
