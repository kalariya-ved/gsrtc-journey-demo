/**
 * Civic Transit Portal design: a route-centred operational board with explicit mock-data disclosure,
 * RoutePulse blue movement cues, compact status controls, and no implication of a real GSRTC feed.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { BusFront, CheckCircle2, Clock3, MapPin, Navigation, Pause, Play, Radio, RefreshCw, Route, Signal, UserRound } from "lucide-react";
import { toast } from "sonner";
import { BookingShell } from "@/components/BookingShell";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

type TrackingSnapshot = { progress: number; anchorIndex: number; status: string; location: string; eta: string; remaining: string; updateAge: string; speed: string };
type TrackingService = { id: string; label: string; route: string; vehicle: string; schedule: string; stops: Array<{ name: string; note: string }>; snapshots: TrackingSnapshot[] };

const mockServices: TrackingService[] = [
  {
    id: "RP-420", label: "RoutePulse Express · RP-420", route: "Ahmedabad → Vadodara", vehicle: "Volvo AC Seater", schedule: "06:30 – 12:20", stops: [{ name: "Ahmedabad", note: "Departed · 06:30 AM" }, { name: "Anand Bypass", note: "Scheduled rest stop" }, { name: "Vadodara", note: "Scheduled arrival · 12:20 PM" }], snapshots: [
      { progress: 28, anchorIndex: 1, status: "On route", location: "Near Kheda Junction", eta: "12:20 PM", remaining: "1 hr 35 min remaining", updateAge: "15 seconds ago", speed: "52 km/h" },
      { progress: 47, anchorIndex: 1, status: "Approaching stop", location: "Approaching Anand Bypass", eta: "12:16 PM", remaining: "1 hr 12 min remaining", updateAge: "5 seconds ago", speed: "44 km/h" },
      { progress: 66, anchorIndex: 1, status: "At rest stop", location: "Anand Bypass", eta: "12:24 PM", remaining: "1 hr 3 min remaining", updateAge: "Now", speed: "0 km/h" },
      { progress: 82, anchorIndex: 2, status: "On final leg", location: "Near Nadiad", eta: "12:21 PM", remaining: "36 min remaining", updateAge: "9 seconds ago", speed: "55 km/h" },
    ],
  },
  {
    id: "RP-887", label: "GreenRoute Electric · RP-887", route: "Ahmedabad → Vadodara", vehicle: "Electric AC Coach", schedule: "17:45 – 23:25", stops: [{ name: "Ahmedabad", note: "Departed · 05:45 PM" }, { name: "Nadiad Circle", note: "Scheduled comfort stop" }, { name: "Vadodara", note: "Scheduled arrival · 11:25 PM" }], snapshots: [
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

  return <BookingShell step="ticket" eyebrow="Live service tracking" title={activeService.label}>
    <div className="mock-disclosure"><Radio /><span><b>Demo service notice</b><small>All vehicle positions, ETAs, timestamps, and speeds below are simulated for the RoutePulse demo. They are not sourced from GSRTC.</small></span></div>
    <div className="tracking-page-layout">
      <section className="tracking-map-panel">
        <div className="tracking-map-heading">
          <div><span><Signal />Simulated route signal</span><h2>{activeService.route}</h2><p>Choose a service or play through simulated route updates. A real GPS feed requires an authorized operator integration.</p></div>
          <div className="tracking-actions"><button onClick={() => setIsPlaying((current) => !current)} aria-pressed={isPlaying}>{isPlaying ? <Pause /> : <Play />}{isPlaying ? "Pause demo" : "Play demo"}</button><button onClick={refreshMock}><RefreshCw />Next update</button></div>
        </div>
        <div className="tracking-service-bar"><label>Tracked service<select value={serviceId} onChange={(event) => setServiceId(event.target.value)}>{mockServices.map((service) => <option key={service.id} value={service.id}>{service.label}</option>)}</select></label><div><span>Update cadence</span><b>Every 4.2 sec</b></div><div><span>Feed sequence</span><b>{snapshotIndex + 1} of {activeService.snapshots.length}</b></div></div>
        <div className="tracking-map-frame mock-route-frame" style={trackingStyle}>
          <div className="fallback-map-grid" />
          <div className="mock-route-path"><i className="mock-route-origin" /><i className="mock-route-stop" /><i className="mock-route-destination" /></div>
          <div className="mock-bus-marker"><img src={routePulseLogo} alt="" /><span>RP</span></div>
          <span className="fallback-label origin-label">Ahmedabad<small>Departed</small></span><span className="fallback-label current-label mock-current-label">{snapshot.location}<small>{snapshot.status} · {snapshot.speed}</small></span><span className="fallback-label destination-label">Vadodara<small>ETA {snapshot.eta}</small></span>
          <div className="fallback-map-stamp"><img src={routePulseLogo} alt="" /><span>Mock route<br />tracking preview</span></div>
          <div className="mock-route-progress"><span>Simulated route progress</span><b>{snapshot.progress}%</b><i><em style={{ width: `${snapshot.progress}%` }} /></i></div>
        </div>
      </section>
      <aside className="tracking-status-panel" aria-live="polite"><div className="tracking-current"><BusFront /><div><span>Simulated service status</span><strong>{snapshot.status}</strong><small>Last simulated update: {snapshot.updateAge}</small></div></div><div className="eta-block"><span>Estimated arrival</span><strong>{snapshot.eta}</strong><small>{snapshot.remaining}</small></div><div className="tracking-stop-list"><h2>Route progress</h2>{activeService.stops.map((stop, index) => <div key={stop.name} className={index < snapshot.anchorIndex ? "stop is-complete" : index === snapshot.anchorIndex ? "stop is-current" : "stop"}><i>{index < snapshot.anchorIndex ? <CheckCircle2 /> : index === snapshot.anchorIndex ? <Navigation /> : <MapPin />}</i><span><b>{stop.name}</b><small>{index === snapshot.anchorIndex ? `${snapshot.status} · ${snapshot.location}` : stop.note}</small></span></div>)}</div><button onClick={() => toast.info("Driver and fleet contact details require a connected operations system.")} className="tracking-contact"><UserRound />Service support <span>1800 233 666666</span></button></aside>
    </div>
    <div className="tracking-info-grid"><div><Route /><span><b>Service route</b><small>{activeService.route.replace(" → ", " → Anand Bypass → ")}</small></span></div><div><Clock3 /><span><b>Scheduled duration</b><small>{activeService.schedule}</small></span></div><div><BusFront /><span><b>Vehicle</b><small>{activeService.vehicle} · {activeService.id}</small></span></div></div>
  </BookingShell>;
}
