import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import BusDetails from "./pages/BusDetails";
import SeatSelection from "./pages/SeatSelection";
import PassengerDetails from "./pages/PassengerDetails";
import BookingReview from "./pages/BookingReview";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import Dashboard from "./pages/Dashboard";
import Tracking from "./pages/Tracking";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/results"} component={SearchResults} />
      <Route path={"/bus-details"} component={BusDetails} />
      <Route path={"/seats"} component={SeatSelection} />
      <Route path={"/passengers"} component={PassengerDetails} />
      <Route path={"/review"} component={BookingReview} />
      <Route path={"/payment"} component={Payment} />
      <Route path={"/ticket"} component={Ticket} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/tracking"} component={Tracking} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
