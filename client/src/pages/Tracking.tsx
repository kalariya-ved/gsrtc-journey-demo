/**
 * GSRTC Journey Demo design: a route-centred operational board with explicit mock-data disclosure,
 * civic-blue movement cues, compact status controls, and no implication of a real GSRTC feed.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, BusFront, CheckCircle2, Clock3, MapPin, Navigation, Pause, Play, Radio, RefreshCw, Route, Signal, UserRound } from "lucide-react";
import { toast } from "sonner";
import { BookingShell } from "@/components/BookingShell";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

type TrackingSnapshot = { progress: number; anchorIndex: number; status: string; location: string; eta: string; remaining: string; updateAge: string; speed: string };
type TrackingService = { id: string; label: string; route: string; vehicle: string; schedule: string; stops: Array<{ name: string; note: string }>; snapshots: TrackingSnapshot[] };

const mockServices: TrackingService[] = [
  {
    id: "GJ-D420", label: "GSRTC Demo Express · GJ-D420", route: "Ahmedabad → Vadodara", vehicle: "Volvo AC Seater", schedule: "06:30 – 12:20", stops: [{ name: "Ahmedabad", note: "Sample departure · 06:30 AM" }, { name: "Anand Bypass", note: "Sample rest stop" }, { name: "Vadodara", note: "Sample arrival · 12:20 PM" }], snapshots: [
      { progress: 28, anchorIndex: 1, status: "On route", location: "Near Kheda Junction", eta: "12:20 PM", remaining: "1 hr 35 min remaining", updateAge: "15 seconds ago", speed: "52 km/h" },
      { progress: 47, anchorIndex: 1, status: "Approaching stop", location: "Approaching Anand Bypass", eta: "12:16 PM", remaining: "1 hr 12 min remaining", updateAge: "5 seconds ago", speed: "44 km/h" },
      { progress: 66, anchorIndex: 1, status: "At rest stop", location: "Anand Bypass", eta: "12:24 PM", remaining: "1 hr 3 min remaining", updateAge: "Now", speed: "0 km/h" },
      { progress: 82, anchorIndex: 2, status: "On final leg", location: "Near Nadiad", eta: "12:21 PM", remaining: "36 min remaining", updateAge: "9 seconds ago", speed: "55 km/h" },
    ],
  },
  {
    id: "GJ-D887", label: "Gujarat Demo Electric · GJ-D887", route: "Ahmedabad → Vadodara", vehicle: "Electric AC Coach", schedule: "17:45 – 23:25", stops: [{ name: "Ahmedabad", note: "Sample departure · 05:45 PM" }, { name: "Nadiad Circle", note: "Sample comfort stop" }, { name: "Vadodara", note: "Sample arrival · 11:25 PM" }], snapshots: [
      { progress: 18, anchorIndex: 0, status: "Departing", location: "Leaving Ahmedabad ISBT", eta: "11:25 PM", remaining: "4 hr 44 min remaining", updateAge: "11 seconds ago", speed: "31 km/h" },
      { progress: 42, anchorIndex: 1, status: "On route", location: "Near Kheda Junction", eta: "11:19 PM", remaining: "3 hr 57 min remaining", updateAge: "Now", speed: "50 km/h" },
      { progress: 70, anchorIndex: 1, status: "Charging stop", location: "Nadiad Circle", eta: "11:29 PM", remaining: "3 hr 15 min remaining", updateAge: "6 seconds ago", speed: "0 km/h" },
      { progress: 88, anchorIndex: 2, status: "On final leg", location: "Near Vadodara outskirts", eta: "11:25 PM", remaining: "42 min remaining", updateAge: "14 seconds ago", speed: "56 km/h" },
    ],
  },
];

export default function Tracking() {
  const [serviceId, setServiceId] = useState(mockServices[0].id);
  const [snapshotIndex, setSnapshotIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const activeService = useMemo(() => mockServices.find((service) => service.id === serviceId) ?? mockServices[0], [serviceId]);
  const snapshot = activeService.snapshots[snapshotIndex];
  const trackingStyle = { "--mock-progress": `${snapshot.progress}%` } as CSSProperties;

  const advanceMock = () => setSnapshotIndex((current) => (current + 1) % activeService.snapshots.length);

  useEffect(() => {
    setSnapshotIndex(0);
  }, [activeService.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(advanceMock, 4200);
    return () => window.clearInterval(timer);
  }, [isPlaying, activeService.id]);

  const refreshMock = () => {
    advanceMock();
    toast.info("Mock tracking feed advanced to the next simulated update.");
  };

  return <BookingShell step="ticket" eyebrow="Simulated journey tracking" title="Journey monitor">
    <div className="tracking-v2">
      <section className="v2-journey-hero">
        <div className="v2-hero-top"><span><Radio />GSRTC-inspired simulation service</span><span>Data source: independent demo only</span></div>
        <div className="v2-hero-main"><div><p>Sample intercity route</p><h2>Ahmedabad <ArrowRight /> Vadodara</h2><small>{activeService.label} · {activeService.vehicle}</small></div><div className="v2-state-chip"><span>Sample service state</span><strong>{snapshot.status}</strong><small>Simulation frame · {snapshot.updateAge}</small></div></div>
        <div className="v2-hero-controls"><label><span>Tracked service</span><select value={serviceId} onChange={(event) => setServiceId(event.target.value)}>{mockServices.map((service) => <option key={service.id} value={service.id}>{service.label}</option>)}</select></label><div className="v2-control-buttons"><button onClick={() => setIsPlaying((current) => !current)} aria-pressed={isPlaying}>{isPlaying ? <Pause /> : <Play />}{isPlaying ? "Pause" : "Resume"}</button><button onClick={refreshMock}><RefreshCw />Update</button></div><div className="v2-feed-summary"><span>Simulated feed</span><b>{snapshotIndex + 1} / {activeService.snapshots.length}</b><small>Every 4.2 sec</small></div></div>
      </section>

      <div className="v2-workspace">
        <section className="v2-route-card">
          <div className="v2-card-head"><div><span><Navigation />Journey movement</span><h2>{snapshot.location}</h2></div><div><strong>{snapshot.speed}</strong><small>Simulated speed</small></div></div>
          <div className="v2-route-canvas" style={trackingStyle}>
            <div className="v2-canvas-grid" />
            <div className="v2-route-line"><i className="v2-origin-dot" /><i className="v2-stop-dot" /><i className="v2-destination-dot" /></div>
            <div className="v2-bus-token"><img src={routePulseLogo} alt="" /><span>GJ</span></div>
            <div className="v2-location-label">{snapshot.location}<small>{snapshot.status}</small></div>
            <div className="v2-point-label v2-from">Ahmedabad<small>Departed</small></div><div className="v2-point-label v2-via">{activeService.stops[1].name}<small>Service point</small></div><div className="v2-point-label v2-to">Vadodara<small>ETA {snapshot.eta}</small></div>
            <div className="v2-progress-strip"><span><b>Route completion</b><small>{snapshot.progress}% travelled</small></span><i><em style={{ width: `${snapshot.progress}%` }} /></i></div>
          </div>
        </section>
        <aside className="v2-live-panel" aria-live="polite"><div className="v2-arrival"><div className="v2-arrival-seal"><img src={routePulseLogo} alt="" /><span>GSRTC Journey<br />demo seal</span></div><span>Estimated arrival</span><strong>{snapshot.eta}</strong><small>{snapshot.remaining}</small></div><div className="v2-route-summary"><div><BusFront /><span><b>Vehicle</b><small>{activeService.vehicle}</small></span></div><div><Clock3 /><span><b>Schedule</b><small>{activeService.schedule}</small></span></div></div><div className="v2-next-stop"><span>Next service point</span><b>{snapshot.anchorIndex === 2 ? "Vadodara · Arrival point" : activeService.stops[snapshot.anchorIndex + 1]?.name ?? "Vadodara"}</b><small>{snapshot.anchorIndex === 2 ? "Destination terminal" : "Route timing is simulated"}</small></div><button onClick={() => toast.info("Live driver contact requires a connected fleet provider.")}><UserRound />Contact service desk <ArrowRight /></button></aside>
      </div>

      <section className="v2-stop-card"><div className="v2-stop-card-head"><div><h2>Sample route timeline</h2><p>Illustrative journey points and simulated movement.</p></div><span><Signal />Demo feed active</span></div><div className="v2-stop-timeline">{activeService.stops.map((stop, index) => <div key={stop.name} className={index < snapshot.anchorIndex ? "v2-stop is-complete" : index === snapshot.anchorIndex ? "v2-stop is-current" : "v2-stop"}><i>{index < snapshot.anchorIndex ? <CheckCircle2 /> : index === snapshot.anchorIndex ? <Navigation /> : <MapPin />}</i><span><b>{stop.name}</b><small>{index === snapshot.anchorIndex ? `${snapshot.status} · ${snapshot.location}` : stop.note}</small></span></div>)}</div></section>
      <div className="v2-mock-notice"><Radio /><span><b>Service data notice — independent simulation</b><small>Positions, speeds, ETAs, and timeline changes are simulated. This GSRTC-inspired prototype will show operator data only when an authorised provider is connected.</small></span></div>
    </div>
  </BookingShell>;
}
