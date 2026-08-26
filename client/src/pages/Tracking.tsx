/**
 * GSRTC Journey Demo design: map-led simulated journey monitor with a Google Maps-style road route,
 * visible demo-data boundaries, and compact civic navigation controls.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BusFront, CheckCircle2, Clock3, LocateFixed, MapPin, Navigation, Pause, Play, Radio, RefreshCw, Signal, UserRound } from "lucide-react";
import { toast } from "sonner";
import { BookingShell } from "@/components/BookingShell";
import { MapView } from "@/components/Map";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

type TrackingSnapshot = { progress: number; anchorIndex: number; status: string; location: string; eta: string; remaining: string; updateAge: string; speed: string };
type TrackingService = { id: string; label: string; route: string; vehicle: string; schedule: string; stops: Array<{ name: string; note: string }>; snapshots: TrackingSnapshot[] };

const mapPoints = {
  ahmedabad: { lat: 23.0225, lng: 72.5714 },
  anand: { lat: 22.5645, lng: 72.9289 },
  nadiad: { lat: 22.6939, lng: 72.8616 },
  vadodara: { lat: 22.3072, lng: 73.1812 },
} as const;

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
  const [isMapReady, setIsMapReady] = useState(false);
  const [isMapUnavailable, setIsMapUnavailable] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const busMarkerRef = useRef<google.maps.Marker | null>(null);
  const stopMarkersRef = useRef<google.maps.Marker[]>([]);
  const routePathRef = useRef<google.maps.LatLng[]>([]);
  const progressRef = useRef(0);

  const activeService = useMemo(() => mockServices.find((service) => service.id === serviceId) ?? mockServices[0], [serviceId]);
  const snapshot = activeService.snapshots[snapshotIndex];

  const positionBus = useCallback((progress: number) => {
    const path = routePathRef.current;
    const map = mapRef.current;
    if (!map || path.length === 0 || !window.google) return;
    const pathIndex = Math.min(path.length - 1, Math.max(0, Math.round((progress / 100) * (path.length - 1))));
    const position = path[pathIndex];
    if (!busMarkerRef.current) {
      busMarkerRef.current = new window.google.maps.Marker({
        map,
        position,
        title: "GSRTC Journey Demo vehicle — simulated position",
        zIndex: 10,
        label: { text: "GJ", color: "#ffffff", fontSize: "10px", fontWeight: "800" },
        icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 8, fillColor: "#b82117", fillOpacity: 1, strokeColor: "#ffffff", strokeWeight: 1.5 },
      });
      return;
    }
    busMarkerRef.current.setPosition(position);
  }, []);

  const drawRoute = useCallback((service: TrackingService) => {
    const map = mapRef.current;
    const directionsService = directionsServiceRef.current;
    const directionsRenderer = directionsRendererRef.current;
    if (!map || !directionsService || !directionsRenderer || !window.google) return;

    const viaPoint = service.id === "GJ-D887" ? mapPoints.nadiad : mapPoints.anand;
    stopMarkersRef.current.forEach((marker) => marker.setMap(null));
    stopMarkersRef.current = [];
    const stopDefinitions = [
      { position: mapPoints.ahmedabad, label: "A", title: "Ahmedabad · Sample origin" },
      { position: viaPoint, label: "1", title: `${service.stops[1].name} · Sample stop` },
      { position: mapPoints.vadodara, label: "V", title: "Vadodara · Sample destination" },
    ];
    stopMarkersRef.current = stopDefinitions.map((stop) => new window.google.maps.Marker({
      map,
      position: stop.position,
      title: stop.title,
      zIndex: 4,
      label: { text: stop.label, color: "#ffffff", fontSize: "11px", fontWeight: "800" },
      icon: { path: window.google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: "#076da9", fillOpacity: 1, strokeColor: "#ffffff", strokeWeight: 2 },
    }));

    directionsService.route({
      origin: mapPoints.ahmedabad,
      destination: mapPoints.vadodara,
      waypoints: [{ location: viaPoint, stopover: true }],
      travelMode: window.google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: false,
    }, (result, status) => {
      if (status !== window.google?.maps.DirectionsStatus.OK || !result) {
        toast.error("The road route could not load. The simulated journey controls remain available.");
        return;
      }
      directionsRenderer.setDirections(result);
      routePathRef.current = result.routes[0]?.overview_path ?? [];
      positionBus(progressRef.current);
    });
  }, [positionBus]);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    if (!window.google) return;
    mapRef.current = map;
    map.setOptions({ mapTypeId: "roadmap", mapTypeControl: false, streetViewControl: false, clickableIcons: false, fullscreenControl: true });
    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      map,
      suppressMarkers: true,
      preserveViewport: false,
      polylineOptions: { strokeColor: "#086ba8", strokeOpacity: 0.9, strokeWeight: 6 },
    });
    setIsMapUnavailable(false);
    setIsMapReady(true);
  }, []);

  const advanceMock = () => setSnapshotIndex((current) => (current + 1) % activeService.snapshots.length);

  useEffect(() => {
    setSnapshotIndex(0);
  }, [activeService.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(advanceMock, 4200);
    return () => window.clearInterval(timer);
  }, [isPlaying, activeService.id]);

  useEffect(() => {
    if (isMapReady) drawRoute(activeService);
  }, [activeService, drawRoute, isMapReady]);

  useEffect(() => {
    progressRef.current = snapshot.progress;
    positionBus(snapshot.progress);
  }, [positionBus, snapshot.progress]);

  const refreshMock = () => {
    advanceMock();
    toast.info("Demo bus position advanced along the simulated road route.");
  };

  const locateDemoBus = () => {
    const position = busMarkerRef.current?.getPosition();
    if (!position || !mapRef.current) {
      toast.info("The demo route is loading. Try locate again in a moment.");
      return;
    }
    mapRef.current.panTo(position);
    mapRef.current.setZoom(11);
    toast.info("Map centered on the simulated demo bus.");
  };

  return <BookingShell step="ticket" eyebrow="Simulated journey tracking" title="Journey monitor">
    <div className="tracking-v2">
      <section className="v2-journey-hero">
        <div className="v2-hero-top"><span><Radio />GSRTC-inspired simulation service</span><span>Data source: independent demo only</span></div>
        <div className="v2-hero-main"><div><p>Sample intercity route</p><h2>Ahmedabad <ArrowRight /> Vadodara</h2><small>{activeService.label} · {activeService.vehicle}</small></div><div className="v2-state-chip"><span>Sample service state</span><strong>{snapshot.status}</strong><small>Simulation frame · {snapshot.updateAge}</small></div></div>
        <div className="v2-hero-controls"><label><span>Tracked service</span><select value={serviceId} onChange={(event) => setServiceId(event.target.value)}>{mockServices.map((service) => <option key={service.id} value={service.id}>{service.label}</option>)}</select></label><div className="v2-control-buttons"><button onClick={() => setIsPlaying((current) => !current)} aria-pressed={isPlaying}>{isPlaying ? <Pause /> : <Play />}{isPlaying ? "Pause" : "Resume"}</button><button onClick={refreshMock}><RefreshCw />Update</button><button onClick={locateDemoBus}><LocateFixed />Locate</button></div><div className="v2-feed-summary"><span>Simulated feed</span><b>{snapshotIndex + 1} / {activeService.snapshots.length}</b><small>Every 4.2 sec</small></div></div>
      </section>

      <div className="v2-workspace">
        <section className="v2-route-card">
          <div className="v2-card-head"><div><span><Navigation />Road navigation view</span><h2>{snapshot.location}</h2></div><div><strong>{snapshot.speed}</strong><small>Simulated speed</small></div></div>
          <div className="tracking-map-wrap">
            <MapView className="tracking-google-map" initialCenter={{ lat: 22.67, lng: 72.9 }} initialZoom={9} onMapReady={handleMapReady} onMapError={() => setIsMapUnavailable(true)} />
            {isMapUnavailable && <FallbackNavigationMap progress={snapshot.progress} location={snapshot.location} />}
            <div className="tracking-map-badge"><Radio /><span><b>Demo navigation</b><small>Road route + simulated bus</small></span></div>
            <div className="tracking-map-progress"><span><b>Route completion</b><small>{snapshot.progress}% travelled</small></span><i><em style={{ width: `${snapshot.progress}%` }} /></i></div>
          </div>
        </section>
        <aside className="v2-live-panel" aria-live="polite"><div className="v2-arrival"><div className="v2-arrival-seal"><img src={routePulseLogo} alt="" /><span>GSRTC Journey<br />demo seal</span></div><span>Estimated arrival</span><strong>{snapshot.eta}</strong><small>{snapshot.remaining}</small></div><div className="v2-route-summary"><div><BusFront /><span><b>Vehicle</b><small>{activeService.vehicle}</small></span></div><div><Clock3 /><span><b>Schedule</b><small>{activeService.schedule}</small></span></div></div><div className="v2-next-stop"><span>Next service point</span><b>{snapshot.anchorIndex === 2 ? "Vadodara · Arrival point" : activeService.stops[snapshot.anchorIndex + 1]?.name ?? "Vadodara"}</b><small>{snapshot.anchorIndex === 2 ? "Destination terminal" : "Route timing is simulated"}</small></div><button onClick={() => toast.info("Live driver contact requires a connected fleet provider.")}><UserRound />Contact service desk <ArrowRight /></button></aside>
      </div>

      <section className="v2-stop-card"><div className="v2-stop-card-head"><div><h2>Sample route timeline</h2><p>Illustrative journey points and simulated movement.</p></div><span><Signal />Demo feed active</span></div><div className="v2-stop-timeline">{activeService.stops.map((stop, index) => <div key={stop.name} className={index < snapshot.anchorIndex ? "v2-stop is-complete" : index === snapshot.anchorIndex ? "v2-stop is-current" : "v2-stop"}><i>{index < snapshot.anchorIndex ? <CheckCircle2 /> : index === snapshot.anchorIndex ? <Navigation /> : <MapPin />}</i><span><b>{stop.name}</b><small>{index === snapshot.anchorIndex ? `${snapshot.status} · ${snapshot.location}` : stop.note}</small></span></div>)}</div></section>
      <div className="v2-mock-notice"><Radio /><span><b>Service data notice — independent simulation</b><small>Map roads may be supplied by Google Maps, while the vehicle position, speeds, ETAs, and timeline changes are simulated. This prototype will show operator bus data only when an authorised provider is connected.</small></span></div>
    </div>
  </BookingShell>;
}

function FallbackNavigationMap({ progress, location }: { progress: number; location: string }) {
  const busX = Math.min(458, 72 + (progress / 100) * 386);
  const busY = 246 - Math.sin((progress / 100) * Math.PI) * 70;
  return <div className="tracking-map-fallback" role="img" aria-label={`Road-navigation preview with a simulated bus near ${location}`}>
    <div className="tracking-map-fallback-head"><Navigation /><span><b>Navigation preview</b><small>Managed map unavailable in this preview</small></span></div>
    <svg viewBox="0 0 540 330" aria-hidden="true">
      <rect width="540" height="330" fill="#dcecf1" />
      <path d="M-25 70 C95 115 152 48 260 85 S423 113 570 41" fill="none" stroke="#f9fcfd" strokeWidth="26" />
      <path d="M-25 70 C95 115 152 48 260 85 S423 113 570 41" fill="none" stroke="#b9cbd1" strokeWidth="2" strokeDasharray="9 7" />
      <path d="M25 300 C116 245 164 290 236 222 S386 208 530 137" fill="none" stroke="#f9fcfd" strokeWidth="21" />
      <path d="M25 300 C116 245 164 290 236 222 S386 208 530 137" fill="none" stroke="#c2d2d7" strokeWidth="2" strokeDasharray="7 6" />
      <path d="M75 12 L116 315 M191 0 L228 318 M347 0 L325 318 M472 0 L435 318" stroke="#f9fcfd" strokeWidth="12" />
      <path d="M75 12 L116 315 M191 0 L228 318 M347 0 L325 318 M472 0 L435 318" stroke="#c7d7dc" strokeWidth="1" />
      <path d="M72 246 C160 223 190 212 252 187 S386 188 463 146" fill="none" stroke="#ffffff" strokeWidth="15" />
      <path d="M72 246 C160 223 190 212 252 187 S386 188 463 146" fill="none" stroke="#0871af" strokeWidth="8" />
      <g fill="#ffffff" stroke="#0871af" strokeWidth="4"><circle cx="72" cy="246" r="9" /><circle cx="252" cy="187" r="9" /><circle cx="463" cy="146" r="9" /></g>
      <g fill="#174c70" fontFamily="Roboto Condensed, sans-serif" fontWeight="800" fontSize="13"><text x="46" y="273">Ahmedabad</text><text x="224" y="172">Anand</text><text x="438" y="130">Vadodara</text></g>
      <g fill="#51748a" fontFamily="Noto Sans, sans-serif" fontWeight="700" fontSize="9"><text x="38" y="290">Sample origin</text><text x="215" y="160">Service point</text><text x="430" y="115">Sample destination</text></g>
      <g transform={`translate(${busX} ${busY})`}><circle r="17" fill="#ffffff" stroke="#b82117" strokeWidth="5" /><path d="M-7 -5 h14 v13 h-14 z M-4 -1 h8 M-10 9 h20" fill="none" stroke="#075f9c" strokeWidth="2" strokeLinecap="round" /></g>
      <rect x="20" y="22" width="95" height="22" rx="2" fill="#ffffff" opacity=".95" /><text x="29" y="37" fill="#0b669f" fontFamily="Roboto Condensed, sans-serif" fontWeight="800" fontSize="11">NH 48 · SAMPLE</text>
      <rect x="355" y="275" width="158" height="28" rx="2" fill="#ffffff" opacity=".95" /><text x="365" y="292" fill="#527b94" fontFamily="Noto Sans, sans-serif" fontWeight="700" fontSize="10">BUS POSITION: SIMULATED</text>
    </svg>
  </div>;
}
