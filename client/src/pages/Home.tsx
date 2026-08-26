/**
 * GSRTC Journey Demo: a focused intercity planner using a dark route hero, high-contrast
 * search panel, compact public-service navigation, and restrained blue/red transit authority cues.
 */
import { useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, ArrowUp, ArrowUpDown, BusFront, CalendarDays, CheckCircle2, Clock3, Headphones, MapPin, Menu, Navigation, Search, ShieldCheck, TicketCheck, UsersRound, X, Zap } from "lucide-react";
import { toast } from "sonner";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

const travelModes = ["One way", "Round trip", "Group travel"];
const corridorRoutes = [
  { from: "Ahmedabad", to: "Vadodara", duration: "5h 50m", fare: "From ₹338" },
  { from: "Ahmedabad", to: "Rajkot", duration: "4h 40m", fare: "From ₹295" },
  { from: "Surat", to: "Ahmedabad", duration: "6h 15m", fare: "From ₹410" },
];

const locationOptions = [
  { name: "Ahmedabad", code: "AMD", detail: "Central Bus Terminal · Gujarat" },
  { name: "Ahmedabad ISBT", code: "AMD", detail: "Inter State Bus Terminal · Ranip" },
  { name: "Vadodara", code: "VAD", detail: "Main Transit Depot · Gujarat" },
  { name: "Vadodara Central", code: "VAD", detail: "Central Bus Stand · Sayajigunj" },
  { name: "Rajkot", code: "RAJ", detail: "Central Bus Station · Gujarat" },
  { name: "Surat", code: "SRT", detail: "Central Bus Station · Gujarat" },
  { name: "Anand", code: "ANR", detail: "Anand Bypass · Gujarat" },
  { name: "Gandhinagar", code: "GNR", detail: "Pathikashram Bus Terminal · Gujarat" },
  { name: "Bhavnagar", code: "BHV", detail: "ST Depot · Gujarat" },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [activeMode, setActiveMode] = useState(travelModes[0]);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [singleLady, setSingleLady] = useState(false);

  const searchBuses = () => {
    if (!source || !destination || !travelDate) {
      toast.error("Enter the source, destination, and travel date to search buses.");
      return;
    }
    navigate(`/results?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(travelDate)}&passengers=${encodeURIComponent(passengers)}&singleLady=${singleLady ? "1" : "0"}`);
  };

  const swapLocations = () => {
    setSource(destination);
    setDestination(source);
  };

  const chooseCorridor = (from: string, to: string) => {
    setSource(from);
    setDestination(to);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return <div className="booking-home-v2 min-h-screen">
    <a href="#booking" className="skip-link">Skip to ticket search</a>
    <header className="home-v2-header">
      <div className="home-v2-utility"><div className="civic-container"><span>GSRTC Journey Demo · Passenger Service Desk</span><span>Passenger support: <a href="tel:18002336666">1800 233 666666</a></span><button onClick={() => setIsInfoOpen(true)}>Demo notice</button></div></div>
      <div className="civic-container home-v2-masthead"><button className="home-v2-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><img src={routePulseLogo} alt="" /><span><strong>GSRTC Journey <i>Demo</i></strong><small>Independent Intercity Prototype</small></span></button><nav className="home-v2-nav" aria-label="Primary navigation"><button onClick={() => navigate("/tracking")}><Navigation />Track service</button><button onClick={() => toast.info("Pass services are available in the connected booking system.")}>Bus pass</button><button onClick={() => toast.info("Agent access is available in the connected booking system.")}>Agent desk</button><button onClick={() => toast.info("Traveller accounts are available in the connected booking system.")}>My journeys</button></nav><button className="home-v2-menu" aria-label="Open navigation menu" onClick={() => setIsMobileMenuOpen((current) => !current)}>{isMobileMenuOpen ? <X /> : <Menu />}</button></div>
      {isMobileMenuOpen && <div className="home-v2-mobile-nav"><button onClick={() => navigate("/tracking")}>Track service <ArrowRight /></button><button onClick={() => toast.info("Pass services are available in the connected booking system.")}>Bus pass <ArrowRight /></button><button onClick={() => toast.info("Agent access is available in the connected booking system.")}>Agent desk <ArrowRight /></button><button onClick={() => toast.info("Traveller accounts are available in the connected booking system.")}>My journeys <ArrowRight /></button></div>}
    </header>

    <main>
      <section className="home-v2-hero">
        <div className="civic-container home-v2-hero-grid"><div className="home-v2-hero-copy"><span className="home-v2-eyebrow"><img src={routePulseLogo} alt="" />GSRTC-inspired journey planner</span><h1>Scheduled services.<br /><em>Seat selection.</em><br />Journey ready.</h1><p>Search sample intercity departures, compare schedules, and move directly to service and seat details.</p><div className="home-v2-hero-proof"><span><CheckCircle2 />Schedule-led search</span><span><ShieldCheck />Transparent demo data</span></div></div><div className="home-v2-hero-visual" aria-label="GSRTC-inspired service network diagram"><div className="home-v2-network-head"><img src={routePulseLogo} alt="" /><span><b>GSRTC journey grid</b><small>Sample intercity planning</small></span><em>Demo data</em></div><div className="home-v2-network-body"><div className="network-station station-ahm"><b>AHM</b><small>Ahmedabad</small></div><div className="network-station station-anand"><b>ANR</b><small>Anand</small></div><div className="network-station station-vad"><b>VAD</b><small>Vadodara</small></div><i className="network-rail network-rail-main" /><i className="network-rail network-rail-branch" /><div className="network-coach"><BusFront /><span>GJ D420</span></div></div><div className="home-v2-network-foot"><span><b>03</b> sample corridors</span><span><b>24h</b> demo status cycle</span><span><b>01</b> journey desk</span></div><div className="home-v2-hero-stamp"><img src={routePulseLogo} alt="" /><span><b>GSRTC</b><small>inspired prototype</small></span></div></div></div>
      </section>

      <section id="booking" className="civic-container home-v2-search-wrap">
        <div className="home-v2-search-card"><div className="home-v2-search-head"><div className="home-v2-mode-tabs">{travelModes.map((mode) => <button key={mode} onClick={() => setActiveMode(mode)} className={activeMode === mode ? "is-active" : ""}>{mode}</button>)}</div><span><TicketCheck />Book your journey</span></div><form onSubmit={(event) => { event.preventDefault(); searchBuses(); }}><div className="home-v2-fields"><LocationAutocomplete label="Leaving from" value={source} onChange={setSource} placeholder="City or bus station" /><button type="button" onClick={swapLocations} className="home-v2-swap" aria-label="Swap source and destination"><ArrowUpDown /></button><LocationAutocomplete label="Going to" value={destination} onChange={setDestination} placeholder="City or bus station" /><label><span>Travel date</span><div><CalendarDays /><input value={travelDate} onChange={(event) => setTravelDate(event.target.value)} type="date" /></div></label><label><span>Passengers</span><div><UsersRound /><select value={passengers} onChange={(event) => setPassengers(event.target.value)}>{[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} passenger{count > 1 ? "s" : ""}</option>)}</select></div></label><button className="home-v2-search-button" type="submit"><Search />Search services</button></div><div className="home-v2-form-foot"><label><input checked={singleLady} onChange={(event) => setSingleLady(event.target.checked)} type="checkbox" /><span>Single lady traveller</span></label><button type="button" onClick={() => setIsInfoOpen(true)}><ShieldCheck />Read booking guidance</button></div></form></div>
      </section>

      <section className="civic-container home-v2-assurances"><article><Clock3 /><span><b>Clear departure choices</b><small>Compare scheduled journeys in one view.</small></span></article><article><TicketCheck /><span><b>Seat selection</b><small>Review available seats before your next step.</small></span></article><article><Headphones /><span><b>Passenger help desk</b><small>Guidance before and during travel.</small></span></article></section>

      <section className="civic-container home-v2-corridors"><div className="home-v2-section-intro"><div><span>Plan with confidence</span><h2>Popular corridors</h2></div><button onClick={() => toast.info("All route corridors are shown after you search.")}>Explore all routes <ArrowRight /></button></div><div className="home-v2-corridor-grid">{corridorRoutes.map((route) => <button key={`${route.from}-${route.to}`} onClick={() => chooseCorridor(route.from, route.to)} className="home-v2-corridor"><div><span>{route.from}</span><i /><span>{route.to}</span></div><p><Clock3 />{route.duration}<b>{route.fare}</b></p><small>Use this route <ArrowRight /></small></button>)}</div></section>

      <section className="home-v2-service-strip"><div className="civic-container"><div><Zap /><span><b>Travel alerts</b><small>Bring route updates into your journey.</small></span></div><button onClick={() => navigate("/tracking")}>Open journey monitor <ArrowRight /></button><div><BusFront /><span><b>Service information</b><small>Schedules, fare guidance, and passenger support.</small></span></div></div></section>
    </main>

    <footer className="home-v2-footer"><div className="civic-container"><div><img src={routePulseLogo} alt="" /><span><b>GSRTC Journey Demo</b><small>Independent Intercity Prototype</small></span></div><p>This GSRTC-inspired booking experience is an independent prototype. Schedules, seats, tracking information, and travel notices are demonstration data unless an authorised source is connected.</p><nav><button onClick={() => setIsInfoOpen(true)}>Booking guidance</button><button onClick={() => navigate("/tracking")}>Journey monitor</button><a href="tel:18002336666">1800 233 666666</a></nav></div></footer>
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="home-v2-scroll" aria-label="Scroll to top"><ArrowUp /></button>

    {isInfoOpen && <div className="home-v2-modal-backdrop" role="presentation"><section className="home-v2-info-modal" role="dialog" aria-modal="true" aria-labelledby="booking-guidance-title"><button onClick={() => setIsInfoOpen(false)} aria-label="Close booking guidance"><X /></button><span><ShieldCheck />Booking guidance</span><h2 id="booking-guidance-title">Keep your journey details ready.</h2><p>Use your correct passenger name, mobile number, and email address when continuing to ticket confirmation. These details support booking reference, journey updates, and ticket retrieval.</p><div><CheckCircle2 />This independent GSRTC-inspired prototype uses demo schedules, seats, fares, and tracking until an authorised data source is connected.</div></section></div>}
  </div>;
}

function LocationAutocomplete({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const blurTimeout = useRef<number | null>(null);
  const listId = `${label.toLowerCase().replace(/\s+/g, "-")}-suggestions`;
  const matches = useMemo(() => {
    const query = value.trim().toLowerCase();
    return locationOptions.filter((option) => !query || option.name.toLowerCase().includes(query) || option.detail.toLowerCase().includes(query)).slice(0, 5);
  }, [value]);

  const selectLocation = (name: string) => {
    if (blurTimeout.current !== null) window.clearTimeout(blurTimeout.current);
    onChange(name);
    setIsOpen(false);
    setActiveIndex(0);
  };

  return <label className="home-v2-location-field"><span>{label}</span><div><MapPin /><input value={value} onChange={(event) => { onChange(event.target.value); setIsOpen(true); setActiveIndex(0); }} onFocus={() => setIsOpen(true)} onBlur={() => { blurTimeout.current = window.setTimeout(() => setIsOpen(false), 180); }} onKeyDown={(event) => { if (event.key === "ArrowDown" && matches.length) { event.preventDefault(); setIsOpen(true); setActiveIndex((current) => Math.min(current + 1, matches.length - 1)); } if (event.key === "ArrowUp" && matches.length) { event.preventDefault(); setIsOpen(true); setActiveIndex((current) => Math.max(current - 1, 0)); } if (event.key === "Escape") setIsOpen(false); if (event.key === "Enter" && isOpen && matches[activeIndex]) { event.preventDefault(); selectLocation(matches[activeIndex].name); } }} placeholder={placeholder} role="combobox" aria-expanded={isOpen} aria-controls={listId} aria-autocomplete="list" aria-activedescendant={isOpen && matches[activeIndex] ? `${listId}-${activeIndex}` : undefined} /></div>{isOpen && <div className="location-suggestions" id={listId} role="listbox">{matches.length ? matches.map((option, index) => <button key={`${option.name}-${option.detail}`} id={`${listId}-${index}`} type="button" role="option" aria-selected={activeIndex === index} className={activeIndex === index ? "is-active" : ""} onMouseDown={(event) => event.preventDefault()} onClick={() => selectLocation(option.name)}><MapPin /><span><b><HighlightMatch text={option.name} query={value} /></b><small><HighlightMatch text={option.detail} query={value} /></small></span><em>{option.code}</em></button>) : <p>No city or station matches. Continue typing.</p>}</div>}</label>;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return <>{text}</>;
  const matchIndex = text.toLocaleLowerCase().indexOf(normalizedQuery.toLocaleLowerCase());
  if (matchIndex < 0) return <>{text}</>;
  const matchEnd = matchIndex + normalizedQuery.length;
  return <>{text.slice(0, matchIndex)}<mark>{text.slice(matchIndex, matchEnd)}</mark>{text.slice(matchEnd)}</>;
}
