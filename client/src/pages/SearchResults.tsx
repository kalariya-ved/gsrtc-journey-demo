/**
 * Civic Transit Portal design: RoutePulse blue service hierarchy, compact operational cards,
 * transport-status indicators, red fare actions, and mobile-first trip filtering controls.
 */
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BusFront,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  Filter,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Snowflake,
  TicketCheck,
  UsersRound,
  Wifi,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { ResultSeatModal } from "@/components/ResultSeatModal";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

export type Service = {
  id: string;
  operator: string;
  service: string;
  departure: string;
  arrival: string;
  duration: string;
  seats: number;
  fare: number;
  type: "AC" | "Non-AC";
  departureBand: "Morning" | "Afternoon" | "Evening" | "Night";
  tags: string[];
  boarding: string;
  dropping: string;
};

const services: Service[] = [
  { id: "RP-420", operator: "RoutePulse Express", service: "Volvo AC Seater", departure: "06:30", arrival: "12:20", duration: "5h 50m", seats: 23, fare: 489, type: "AC", departureBand: "Morning", tags: ["Live tracking", "USB charging", "Water bottle"], boarding: "Central Bus Terminal · Bay 12", dropping: "Main Transit Depot · Platform 4" },
  { id: "RP-716", operator: "CivicLine Connect", service: "AC Sleeper", departure: "09:15", arrival: "15:35", duration: "6h 20m", seats: 9, fare: 615, type: "AC", departureBand: "Morning", tags: ["Sleeper", "Blanket", "Live tracking"], boarding: "Railway Circle · Gate 3", dropping: "City Centre Bus Stand · Gate 1" },
  { id: "RP-242", operator: "RoutePulse Citylink", service: "Deluxe Non-AC Seater", departure: "13:10", arrival: "19:35", duration: "6h 25m", seats: 31, fare: 338, type: "Non-AC", departureBand: "Afternoon", tags: ["Comfort seats", "Rest stop", "Budget fare"], boarding: "Civil Hospital Stop", dropping: "Old Market Terminus" },
  { id: "RP-887", operator: "GreenRoute Electric", service: "Electric AC Coach", departure: "17:45", arrival: "23:25", duration: "5h 40m", seats: 17, fare: 532, type: "AC", departureBand: "Evening", tags: ["Electric coach", "Quiet ride", "USB charging"], boarding: "ISBT · Electric Bay 2", dropping: "University Junction" },
  { id: "RP-390", operator: "Nightway Transit", service: "Semi Sleeper", departure: "22:30", arrival: "05:00", duration: "6h 30m", seats: 12, fare: 448, type: "Non-AC", departureBand: "Night", tags: ["Night service", "Reading light", "Live tracking"], boarding: "Central Bus Terminal · Bay 8", dropping: "Main Transit Depot · Platform 2" },
];

const allDepartureBands = ["Morning", "Afternoon", "Evening", "Night"] as const;
const allBusTypes = ["AC", "Non-AC"] as const;
const fareBands = [
  { id: "under-400", label: "Under ₹400", detail: "Budget services", min: 0, max: 399 },
  { id: "400-500", label: "₹400 – ₹500", detail: "Standard fare", min: 400, max: 500 },
  { id: "above-500", label: "Above ₹500", detail: "Premium services", min: 501, max: Infinity },
] as const;

function amenityIcon(label: string) {
  if (label.includes("Live")) return <MapPin aria-hidden="true" />;
  if (label.includes("USB")) return <Wifi aria-hidden="true" />;
  if (label.includes("Rest") || label.includes("Water")) return <Coffee aria-hidden="true" />;
  if (label.includes("Sleeper") || label.includes("Blanket")) return <TicketCheck aria-hidden="true" />;
  return <ShieldCheck aria-hidden="true" />;
}

export default function SearchResults() {
  const [, navigate] = useLocation();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const source = params.get("source") || "Ahmedabad";
  const destination = params.get("destination") || "Vadodara";
  const date = params.get("date") || new Date().toISOString().slice(0, 10);
  const passengers = Number(params.get("passengers") || "1");
  const [acOnly, setAcOnly] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBands, setSelectedBands] = useState<string[]>([]);
  const [selectedFareBands, setSelectedFareBands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"recommended" | "price" | "departure">("recommended");
  const [openService, setOpenService] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const displayDate = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));

  const filteredServices = useMemo(() => {
    const result = services.filter((service) => {
      const matchesQuickAc = !acOnly || service.type === "AC";
      const matchesBusType = selectedTypes.length === 0 || selectedTypes.includes(service.type);
      const matchesDeparture = selectedBands.length === 0 || selectedBands.includes(service.departureBand);
      const matchesFare = selectedFareBands.length === 0 || fareBands.some((band) => selectedFareBands.includes(band.id) && service.fare >= band.min && service.fare <= band.max);
      return matchesQuickAc && matchesBusType && matchesDeparture && matchesFare;
    });
    return [...result].sort((a, b) => {
      if (sortBy === "price") return a.fare - b.fare;
      if (sortBy === "departure") return a.departure.localeCompare(b.departure);
      return b.seats - a.seats;
    });
  }, [acOnly, selectedTypes, selectedBands, selectedFareBands, sortBy]);

  const toggleBand = (band: string) => {
    setSelectedBands((current) => current.includes(band) ? current.filter((item) => item !== band) : [...current, band]);
  };

  const toggleType = (type: string) => {
    setSelectedTypes((current) => current.includes(type) ? current.filter((item) => item !== type) : [...current, type]);
  };

  const toggleFareBand = (band: string) => {
    setSelectedFareBands((current) => current.includes(band) ? current.filter((item) => item !== band) : [...current, band]);
  };

  const clearFilters = () => {
    setAcOnly(false);
    setSelectedTypes([]);
    setSelectedBands([]);
    setSelectedFareBands([]);
  };

  const activeFilterCount = Number(acOnly) + selectedTypes.length + selectedBands.length + selectedFareBands.length;

  return (
    <div className="results-page min-h-screen bg-[#f5f8fb]">
      <header className="results-header">
        <div className="civic-container results-header-content">
          <button onClick={() => navigate("/")} className="results-brand" aria-label="Return to RoutePulse home"><img src={routePulseLogo} alt="" /><span><strong>RoutePulse Transit</strong><small>Public Intercity Services</small></span></button>
          <div className="results-header-support"><span>Need help?</span><a href="tel:18002336666">1800 233 666666</a></div>
        </div>
      </header>

      <main>
        <section className="results-summary-section">
          <div className="civic-container">
            <button className="back-search-link" onClick={() => navigate("/")}><ArrowLeft />Modify search</button>
            <div className="journey-summary">
              <div className="journey-points"><div><span>From</span><strong>{source}</strong></div><ArrowRight /><div><span>To</span><strong>{destination}</strong></div></div>
              <div className="journey-meta"><span><CalendarDays />{displayDate}</span><span><UsersRound />{passengers} passenger{passengers === 1 ? "" : "s"}</span></div>
              <button onClick={() => navigate("/")} className="change-search-button">Change search</button>
            </div>
          </div>
        </section>

        <section className="civic-container results-content">
          <aside className={isFiltersOpen ? "filter-panel is-open" : "filter-panel"} aria-label="Filter available services">
            <div className="filter-heading"><div><Filter /><h2>Filters</h2></div><button className="mobile-filter-close" onClick={() => setIsFiltersOpen(false)} aria-label="Close filters"><X /></button></div>
            <button className={acOnly ? "filter-toggle is-selected" : "filter-toggle"} onClick={() => setAcOnly(!acOnly)}><span><Snowflake />AC services only</span><span className="toggle-switch"><i /></span></button>
            <div className="filter-divider" />
            <fieldset className="filter-group"><legend>Bus type</legend>{allBusTypes.map((type) => <label key={type}><input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} /><span className="custom-check">{selectedTypes.includes(type) && <Check />}</span><span>{type}</span><small>{type === "AC" ? "Air-conditioned comfort" : "Value and standard services"}</small></label>)}</fieldset>
            <div className="filter-divider" />
            <fieldset className="filter-group"><legend>Departure time</legend>{allDepartureBands.map((band) => <label key={band}><input type="checkbox" checked={selectedBands.includes(band)} onChange={() => toggleBand(band)} /><span className="custom-check">{selectedBands.includes(band) && <Check />}</span><span>{band}</span><small>{band === "Morning" ? "Before 12 PM" : band === "Afternoon" ? "12 PM – 5 PM" : band === "Evening" ? "5 PM – 9 PM" : "After 9 PM"}</small></label>)}</fieldset>
            <div className="filter-divider" />
            <fieldset className="filter-group"><legend>Price range</legend>{fareBands.map((band) => <label key={band.id}><input type="checkbox" checked={selectedFareBands.includes(band.id)} onChange={() => toggleFareBand(band.id)} /><span className="custom-check">{selectedFareBands.includes(band.id) && <Check />}</span><span>{band.label}</span><small>{band.detail}</small></label>)}</fieldset>
            <button className="clear-filters" disabled={activeFilterCount === 0} onClick={clearFilters}>Clear all filters</button>
          </aside>

          {isFiltersOpen && <button className="filter-overlay" onClick={() => setIsFiltersOpen(false)} aria-label="Close filter panel" />}

          <div className="service-results">
            <div className="results-toolbar">
              <div><p>Available services {activeFilterCount > 0 && <span className="filter-active-summary">{activeFilterCount} filter{activeFilterCount === 1 ? "" : "s"} active</span>}</p><h1><strong>{filteredServices.length}</strong> buses found</h1></div>
              <div className="toolbar-actions"><button className="mobile-filter-button" onClick={() => setIsFiltersOpen(true)}><SlidersHorizontal />Filters</button><label className="sort-select"><span>Sort by</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)}><option value="recommended">Recommended</option><option value="price">Lowest fare</option><option value="departure">Earliest departure</option></select><ChevronDown /></label></div>
            </div>
            <div className="service-notice"><BusFront /><span>Demo filters update the sample services below. Fares are shown per passenger.</span></div>
            <div className="service-list">
              {filteredServices.map((service) => <ServiceCard key={service.id} service={service} source={source} destination={destination} isOpen={openService === service.id} onToggle={() => setOpenService(openService === service.id ? null : service.id)} onSelect={() => setSelectedService(service)} />)}
              {filteredServices.length === 0 && <div className="empty-results"><BusFront /><h2>No services match these filters</h2><p>Clear one or more filters to see available journeys for this date.</p><button onClick={clearFilters}>Reset filters</button></div>}
            </div>
          </div>
        </section>
      </main>
      {selectedService && <ResultSeatModal service={selectedService} onClose={() => setSelectedService(null)} onContinue={(seats) => navigate(`/passengers?service=${encodeURIComponent(selectedService.id)}&source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&passengers=${encodeURIComponent(passengers)}&seats=${encodeURIComponent(seats.join(","))}`)} />}
    </div>
  );
}

function ServiceCard({ service, source, destination, isOpen, onToggle, onSelect }: { service: Service; source: string; destination: string; isOpen: boolean; onToggle: () => void; onSelect: () => void }) {
  return (
    <article className="service-card">
      <div className="service-card-main">
        <div className="operator-info"><div className="service-icon"><BusFront /></div><div><h2>{service.operator}</h2><p>{service.service} <span>•</span> {service.type}</p></div></div>
        <div className="timing-block"><div><strong>{service.departure}</strong><span>{source}</span></div><div className="duration-line"><i /><span>{service.duration}</span><i /></div><div><strong>{service.arrival}</strong><span>{destination}</span></div></div>
        <div className="availability-block"><span>{service.seats} seats left</span><strong>₹{service.fare}</strong><small>per passenger</small></div>
        <button onClick={onSelect} className="select-seat-button">Select seats</button>
      </div>
      <div className="service-card-footer"><div className="amenities">{service.tags.map((tag) => <span key={tag}>{amenityIcon(tag)}{tag}</span>)}</div><button onClick={onToggle} className="boarding-button">Boarding & dropping <ChevronDown className={isOpen ? "chevron-up" : ""} /></button></div>
      {isOpen && <div className="boarding-details"><div><span>Boarding point</span><strong><MapPin />{service.boarding}</strong></div><div><span>Dropping point</span><strong><MapPin />{service.dropping}</strong></div><div><span>Service ID</span><strong>{service.id}</strong></div></div>}
    </article>
  );
}
