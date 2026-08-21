/**
 * Civic Transit Portal design: compact public-service hierarchy, RoutePulse blue booking rail,
 * red task accents, operational density, rectangular fields, and restrained responsive motion.
 */
import { useState } from "react";
import {
  Apple,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  BusFront,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Globe2,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  TicketCheck,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";
import { toast } from "sonner";

const routePulseLogo = "/manus-storage/routepulse-logo_c9f17078.png";
const heroImage = "/manus-storage/routepulse-hero_e9db7cb9.jpg";
const feedbackImage = "/manus-storage/routepulse-feedback-panel_44602ea4.jpg";
const unityImage = "/manus-storage/routepulse-destination-unity_3f1d69e1.jpg";
const templeImage = "/manus-storage/routepulse-destination-temple_b99f6463.jpg";

const bookingTabs = [
  "Advance Booking",
  "Educator Travel",
  "Official Travel",
  "Accessible Travel",
  "Landmark Services",
  "Electric Coach",
];

const footerGroups = [
  [
    "About RoutePulse",
    "Leadership",
    "Special services",
    "Achievements",
    "Tenders",
    "FAQs",
    "Sitemap",
    "Recruitment",
    "Contact us",
    "Awards",
    "Partner directory",
  ],
  [
    "Divisions",
    "Corporate office",
    "Performance",
    "Bus enquiry",
    "Pilgrim travel services",
    "Downloads",
    "Privacy policy",
    "India code",
    "Press releases",
    "Passenger rights",
    "Service regulation",
  ],
];

const stats = [
  { label: "Android App Downloaded", value: "6,392,501", icon: Smartphone, color: "stat-blue" },
  { label: "iOS App Downloaded", value: "1,309,035", icon: Apple, color: "stat-berry" },
  { label: "Wallet Users", value: "1,286,369", icon: WalletCards, color: "stat-amber" },
  { label: "Visitors Count", value: "31,37,16,980", icon: UsersRound, color: "stat-green" },
];

function ActionToast({ label }: { label: string }) {
  return (
    <button
      onClick={() => toast.info(`${label} is available in the full booking service.`)}
      className="transition-opacity hover:opacity-85"
    >
      {label}
    </button>
  );
}

export default function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(bookingTabs[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [singleLady, setSingleLady] = useState(false);

  const swapLocations = () => {
    setSource(destination);
    setDestination(source);
  };

  const searchBuses = () => {
    if (!source || !destination || !travelDate) {
      toast.error("Enter the source, destination, and travel date to search buses.");
      return;
    }
    toast.success(`Searching services from ${source} to ${destination} for ${travelDate}.`);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7fafc] text-slate-800">
      <a href="#booking" className="skip-link">Skip to booking</a>

      <header className="relative z-20 bg-white">
        <div className="utility-strip">
          <div className="civic-container utility-row">
            <div className="utility-contact">
              <a href="mailto:support@routepulse.example"><Mail aria-hidden="true" />support@routepulse.example</a>
              <span className="utility-divider">/</span>
              <a href="mailto:refunds@routepulse.example">refunds@routepulse.example</a>
              <a href="tel:18002336666" className="phone-link"><Phone aria-hidden="true" />1800 233 666666</a>
            </div>
            <nav className="utility-links" aria-label="Utility navigation">
              <a href="#booking">Skip to main content</a>
              <ActionToast label="Traveller Login" />
              <ActionToast label="Pass Login" />
              <ActionToast label="Alert" />
            </nav>
          </div>
        </div>

        <div className="access-strip">
          <div className="civic-container access-row">
            <button onClick={() => toast.info("Accessibility preferences are available in the complete service.")} className="accessibility-link"><CircleHelp aria-hidden="true" />Accessibility Options</button>
            <button onClick={() => toast.info("Language selection is ready for multilingual routes.")} className="language-link"><Globe2 aria-hidden="true" />English<ChevronDown aria-hidden="true" /></button>
          </div>
        </div>

        <div className="civic-container masthead">
          <a className="brand-lockup" href="#top" aria-label="RoutePulse Transit home">
            <img src={routePulseLogo} alt="" className="brand-mark" />
            <span className="brand-copy">
              <strong>RoutePulse Transit</strong>
              <span>Public Intercity Services</span>
              <em>Every mile, connected.</em>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <ActionToast label="Online Users" />
            <ActionToast label="Agent Login" />
            <ActionToast label="Pilgrim Travel" />
            <ActionToast label="Bus Pass" />
            <ActionToast label="Unity Booking" />
          </nav>

          <button className="mobile-menu-button" aria-label="Open navigation menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-nav-panel">
            {["Online Users", "Agent Login", "Pilgrim Travel", "Bus Pass", "Unity Booking"].map((item) => (
              <button key={item} onClick={() => { setIsMobileMenuOpen(false); toast.info(`${item} is available in the full booking service.`); }}>{item}<ChevronRight /></button>
            ))}
          </div>
        )}
        <div className="notice-strip"><div className="civic-container"><strong>NOTE:</strong> Complete each ticket booking in one session. Keep your name, mobile number, and email address correct for travel updates.</div></div>
      </header>

      <main id="top">
        <section className="hero-section" aria-label="RoutePulse booking milestone">
          <img src={heroImage} alt="Stylized bus service progress illustration" className="hero-image" />
          <div className="hero-overlay civic-container">
            <div className="hero-copy">
              <span className="hero-kicker">RoutePulse service update</span>
              <h1>Reliable seats.<br />Connected journeys.</h1>
              <p>Plan intercity travel with route guidance, accessible options, and real-time service information.</p>
            </div>
          </div>
        </section>

        <section id="booking" className="booking-rail" aria-label="Search bus services">
          <div className="civic-container">
            <div className="booking-tabs" role="tablist" aria-label="Travel service categories">
              {bookingTabs.map((tab) => (
                <button key={tab} role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "booking-tab active" : "booking-tab"}>{tab}</button>
              ))}
            </div>
            <form className="booking-form" onSubmit={(event) => { event.preventDefault(); searchBuses(); }}>
              <label className="booking-field"><span className="sr-only">Source</span><MapPin aria-hidden="true" /><input value={source} onChange={(event) => setSource(event.target.value)} placeholder="Source" /></label>
              <button type="button" className="swap-button" onClick={swapLocations} aria-label="Swap source and destination"><ArrowUpDown /></button>
              <label className="booking-field"><span className="sr-only">Destination</span><MapPin aria-hidden="true" /><input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Destination" /></label>
              <label className="booking-field date-field"><span className="sr-only">Travel date</span><CalendarDays aria-hidden="true" /><input value={travelDate} onChange={(event) => setTravelDate(event.target.value)} type="date" /></label>
              <label className="passenger-field"><span className="sr-only">Passengers</span><UsersRound aria-hidden="true" /><select value={passengers} onChange={(event) => setPassengers(event.target.value)}>{[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count}</option>)}</select></label>
              <label className="lady-toggle"><input checked={singleLady} onChange={(event) => setSingleLady(event.target.checked)} type="checkbox" /><span>Single Lady</span></label>
              <button className="search-button" type="submit"><Search />Search</button>
            </form>
          </div>
        </section>

        <section className="civic-container support-band" aria-label="Passenger support links">
          <div className="feedback-card">
            <img src={feedbackImage} alt="RoutePulse passenger feedback and coach service illustration" />
            <div className="feedback-qr"><div className="qr-grid" aria-hidden="true" /><span>Share a route note</span><a href="#feedback">routepulse.example/feedback</a></div>
          </div>
          <div className="policy-card">
            {["Booking policy (English)", "Booking policy (Hindi)", "Booking policy (Gujarati)"].map((item) => (
              <button key={item} onClick={() => toast.info(`${item} will open in the complete policy library.`)}><ChevronRight />{item}</button>
            ))}
          </div>
        </section>

        <section className="metrics-section">
          <div className="civic-container">
            <SectionTitle title="RoutePulse Growing Numbers" />
            <div className="metrics-grid">
              {stats.map(({ label, value, icon: Icon, color }) => (
                <article className={`metric-card ${color}`} key={label}>
                  <Icon aria-hidden="true" />
                  <h3>{label}</h3>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tracking-section">
          <div className="civic-container">
            <SectionTitle title="RoutePulse Live Tracking" />
            <div className="tracking-actions">
              <button onClick={() => toast.info("Live tracking opens after you choose a scheduled service.")}><BusFront /><span><b>RoutePulse Live Tracking</b><small>Follow your scheduled service</small></span><ArrowRight /></button>
              <button onClick={() => toast.info("The mobile companion is available in the full service.")}><Apple /><span><b>Download iOS App</b><small>Trip alerts in your pocket</small></span><ArrowRight /></button>
            </div>
          </div>
        </section>

        <section className="destinations-section" id="destinations">
          <div className="civic-container">
            <SectionTitle title="Top Destinations" />
            <p className="section-intro">Popular pilgrimage corridors, visitor landmarks, and commercial hubs with reliable scheduled services.</p>
            <div className="destination-controls"><button onClick={() => toast.info("Previous destinations") } aria-label="Previous destinations"><ArrowLeft /></button><button onClick={() => toast.info("Next destinations") } aria-label="Next destinations"><ArrowRight /></button></div>
            <div className="destination-grid">
              <DestinationCard image={unityImage} title="Valley Monument" body="A striking riverside landmark set among green hills, connected through dedicated regional services." />
              <DestinationCard image={templeImage} title="Sunstone Temple" body="A peaceful heritage stop with convenient onward connections for local and long-distance passengers." />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="civic-container footer-upper">
          {footerGroups.map((group, index) => <ul key={index}>{group.map((link) => <li key={link}><button onClick={() => toast.info(`${link} is available in the complete service.`)}><ChevronRight />{link}</button></li>)}</ul>)}
        </div>
        <div className="civic-container footer-support">
          <div className="browser-compatibility"><span>Browser Compatibility</span><div className="browser-dots"><i className="chrome" /><i className="edge" /><i className="firefox" /><i className="opera" /></div></div>
          <div className="app-downloads"><button onClick={() => toast.info("Android app link will open in the complete service.")}><Smartphone />Download Android App</button><span aria-hidden="true" /> <button onClick={() => toast.info("iOS app link will open in the complete service.")}><Apple />Download iOS App</button></div>
          <a className="toll-free" href="tel:18002336666"><span>Toll Free<br />Number:</span><b>1800 233<br />666666</b></a>
        </div>
        <div className="footer-bottom">© RoutePulse Transit. All Rights Reserved. <span>Version Details: 21/08/2026, 20:00 PM</span></div>
      </footer>

      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="scroll-top" aria-label="Scroll to top"><ArrowUp /></button>

      {isInfoOpen && (
        <div className="modal-backdrop" role="presentation">
          <section className="information-modal" role="dialog" aria-modal="true" aria-labelledby="information-title">
            <button className="modal-close" onClick={() => setIsInfoOpen(false)}>Close</button>
            <h2 id="information-title">Important Information:</h2>
            <p>For ticket history checking or ticket cancellation, every passenger is requested to provide their <strong>Name, Mobile Number and Email ID</strong> correctly at the time of booking.</p>
            <div className="modal-rule" />
            <p lang="gu">ટિકિટ હિસ્ટ્રી ચેકિંગ અને ટિકિટ કેન્સલેશન માટે, ટિકિટ બુકિંગ સમયે દરેક મુસાફરનું નામ, મોબાઇલ નંબર અને ઈ-મેલ આઈડી સાચું દર્શાવવું જરૂરી છે.</p>
            <div className="modal-rule" />
            <p lang="hi">टिकट हिस्ट्री और टिकट कैंसलेशन के लिए, टिकट बुकिंग के समय अपना नाम, मोबाइल नंबर और ईमेल आईडी सही दर्ज करना आवश्यक है।</p>
          </section>
        </div>
      )}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="section-title">{title}</h2>;
}

function DestinationCard({ image, title, body }: { image: string; title: string; body: string }) {
  return (
    <article className="destination-card">
      <img src={image} alt="" />
      <div><h3>{title}</h3><p>{body}</p><button onClick={() => toast.info(`${title} schedules are shown after search.`)}>View schedules <ChevronRight /></button></div>
    </article>
  );
}
