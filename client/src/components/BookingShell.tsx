/**
 * Civic Transit Portal design: formal RoutePulse lockup, blue progress rail, compact operational
 * navigation, rectangular panels, and red reserved exclusively for decisive traveller actions.
 */
import type { ReactNode } from "react";
import { ArrowLeft, BusFront, ChevronRight, MapPin, UserRound } from "lucide-react";
import { useLocation } from "wouter";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";

export type BookingStep = "details" | "seats" | "passengers" | "review" | "payment" | "ticket";

const steps: Array<{ id: BookingStep; label: string }> = [
  { id: "details", label: "Service" },
  { id: "seats", label: "Seats" },
  { id: "passengers", label: "Passenger" },
  { id: "review", label: "Review" },
  { id: "payment", label: "Payment" },
];

export function BookingShell({ step, title, eyebrow, children }: { step: BookingStep; title: string; eyebrow: string; children: ReactNode }) {
  const [, navigate] = useLocation();
  const activeIndex = step === "ticket" ? steps.length : steps.findIndex((item) => item.id === step);

  return (
    <div className="booking-page min-h-screen bg-[#f4f7fa]">
      <div className="booking-utility-bar"><div className="civic-container booking-utility-content"><span>RoutePulse Transit Service Desk</span><span>Public intercity information system</span></div></div>
      <header className="booking-header">
        <div className="civic-container booking-header-content">
          <button onClick={() => navigate("/")} className="booking-brand"><img src={routePulseLogo} alt="" /><span><strong>RoutePulse Transit <i>Service Network</i></strong><small>Public Intercity Services</small></span></button>
          <nav className="booking-header-nav" aria-label="Traveller navigation"><button onClick={() => navigate("/tracking")}><MapPin />Track service</button><button onClick={() => navigate("/dashboard")}><UserRound />My journeys</button></nav>
        </div>
      </header>
      {step !== "ticket" && <div className="booking-progress-wrap"><div className="civic-container booking-progress">{steps.map((item, index) => <div key={item.id} className={index <= activeIndex ? "progress-step is-active" : "progress-step"}><span>{index < activeIndex ? <ChevronRight /> : index + 1}</span><b>{item.label}</b></div>)}</div></div>}
      <main className="civic-container booking-main">
        <button className="booking-back" onClick={() => window.history.length > 1 ? window.history.back() : navigate("/results")}><ArrowLeft />Back to search</button>
        <div className="booking-title-row"><div><p>{eyebrow}</p><h1>{title}</h1></div><div className="booking-help"><BusFront /><span>Need booking help?<br /><b>1800 233 666666</b></span></div></div>
        {children}
      </main>
    </div>
  );
}

export function JourneyMiniCard({ seats = "A3" }: { seats?: string }) {
  return <aside className="journey-mini-card"><div className="mini-card-top"><BusFront /><span><b>RoutePulse Express</b><small>Volvo AC Seater · RP-420</small></span></div><div className="mini-route"><span>Ahmedabad<small>06:30</small></span><i /><span>Vadodara<small>12:20</small></span></div><div className="mini-meta"><span>Sun, 23 Aug 2026</span><span>Seat {seats}</span></div></aside>;
}
