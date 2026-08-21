/** Civic Transit Portal design: route-centered tracking board with map context, official status rows, and transparent demo labelling. */
import { useRef, useState } from "react";
import { BusFront, CheckCircle2, Clock3, MapPin, Navigation, Route, Signal, UserRound } from "lucide-react";
import { toast } from "sonner";
import { BookingShell } from "@/components/BookingShell";
import { MapView } from "@/components/Map";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

export default function Tracking() {
  const hasInitialized = useRef(false);
  const [isMapReady, setIsMapReady] = useState(false);

  return (
    <BookingShell step="ticket" eyebrow="Live service tracking" title="RoutePulse Express · RP-420">
      <div className="tracking-page-layout">
        <section className="tracking-map-panel">
          <div className="tracking-map-heading">
            <div>
              <span><Signal />Service signal active</span>
              <h2>Ahmedabad to Vadodara</h2>
              <p>Demo route position shown for interface preview. Live GPS requires an integrated fleet-data provider.</p>
            </div>
            <button onClick={() => toast.info("The service view is refreshed in the connected tracking system.")}><Navigation />Refresh</button>
          </div>
          <div className="tracking-map-frame">
            <MapView
              className="routepulse-map"
              initialCenter={{ lat: 22.7, lng: 72.88 }}
              initialZoom={9}
              onMapReady={(map) => {
                setIsMapReady(true);
                if (hasInitialized.current || !window.google) return;
                hasInitialized.current = true;
                const points = [{ lat: 23.0225, lng: 72.5714 }, { lat: 22.716, lng: 72.836 }, { lat: 22.3072, lng: 73.1812 }];
                new window.google.maps.Polyline({ path: points, geodesic: true, strokeColor: "#075e9b", strokeOpacity: 0.9, strokeWeight: 5, map });
                points.forEach((position, index) => new window.google.maps.Marker({ map, position, title: index === 1 ? "RoutePulse Express · demo location" : index === 0 ? "Ahmedabad" : "Vadodara", label: index === 1 ? "RP" : undefined }));
              }}
            />
            {!isMapReady && <div className="tracking-map-fallback"><div className="fallback-map-grid" /><div className="fallback-route"><i className="route-origin" /><i className="route-current"><img src={routePulseLogo} alt="" /></i><i className="route-destination" /></div><span className="fallback-label origin-label">Ahmedabad<br /><small>Departed</small></span><span className="fallback-label current-label">RoutePulse Express<br /><small>Demo location</small></span><span className="fallback-label destination-label">Vadodara<br /><small>Expected 12:20 PM</small></span><div className="fallback-map-stamp"><img src={routePulseLogo} alt="" /><span>RoutePulse<br />Tracking preview</span></div></div>}
          </div>
        </section>
        <aside className="tracking-status-panel">
          <div className="tracking-current"><BusFront /><div><span>Current status</span><strong>On route</strong><small>Last demo update: 2 minutes ago</small></div></div>
          <div className="eta-block"><span>Estimated arrival</span><strong>12:20 PM</strong><small>Approximately 1 hr 35 min remaining</small></div>
          <div className="tracking-stop-list"><h2>Route progress</h2><div className="stop is-complete"><i><CheckCircle2 /></i><span><b>Ahmedabad</b><small>Departed · 06:30 AM</small></span></div><div className="stop is-current"><i><Navigation /></i><span><b>Anand Bypass</b><small>Passing now · Demo location</small></span></div><div className="stop"><i><MapPin /></i><span><b>Vadodara</b><small>Expected · 12:20 PM</small></span></div></div>
          <button onClick={() => toast.info("Driver and fleet contact details require a connected operations system.")} className="tracking-contact"><UserRound />Service support <span>1800 233 666666</span></button>
        </aside>
      </div>
      <div className="tracking-info-grid"><div><Route /><span><b>Service route</b><small>Ahmedabad → Anand Bypass → Vadodara</small></span></div><div><Clock3 /><span><b>Scheduled duration</b><small>5 hours 50 minutes</small></span></div><div><BusFront /><span><b>Vehicle</b><small>Volvo AC Seater · RP-420</small></span></div></div>
    </BookingShell>
  );
}
