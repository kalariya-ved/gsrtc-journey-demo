# Bus Search Results Enhancement

- [x] Define representative scheduled services and search-result filters.
- [x] Add a responsive results route with journey summary, filtering, sorting, and route cards.
- [x] Connect homepage search submission to the results route with journey parameters.
- [x] Verify search flow and layouts across desktop and mobile viewports.
- [x] Save the completed enhancement as a delivery checkpoint.

# Core Traveller Pages Expansion

- [x] Add a shared booking-progress pattern and cross-page navigation.
- [x] Build bus-details and interactive seat-selection pages.
- [x] Build passenger details, booking review, payment, and e-ticket pages.
- [x] Build traveller dashboard and live tracking pages.
- [x] Verify desktop and mobile flows across all new pages.
- [x] Save the expanded application as a delivery checkpoint.

# External Service Endpoint Assessment

- [x] Inspect the supplied GSRTC service-search endpoint response and access constraints.
- [x] Document whether the endpoint can be safely incorporated into RoutePulse and identify the appropriate implementation path.

# Demo Search Filters

- [x] Define selectable bus types, departure windows, and fare bands for the existing demo services.
- [x] Implement matching filter controls, active-filter feedback, and reset behavior.
- [x] Verify the filter experience across desktop and mobile layouts.
- [x] Save the updated search experience as a delivery checkpoint.

# Results-Page Seat Selection Modal

- [x] Define dummy seat states, price calculation, and modal confirmation behavior.
- [x] Implement the bus-card seat modal with interactive availability states.
- [x] Verify the modal across desktop and mobile layouts.
- [x] Save the seat-modal enhancement as a delivery checkpoint.

# Authorized Real-Time GSRTC Data Assessment

- [x] Identify official or otherwise authorized GSRTC real-time schedule, availability, or vehicle-location data sources.
- [x] Determine credentials, contractual permissions, and required backend/database architecture.
- [x] Provide an implementation recommendation that preserves data-source terms and user privacy.

# Community Repository Assessment

- [x] Inspect the supplied GSRTC reservation-system repository’s declared purpose, data sources, and licence.
- [x] Identify architectural concepts that may be reimplemented independently in RoutePulse.
- [x] Determine whether the repository contains an authorized real-time GSRTC data connection.

# AGUTS Repository Assessment

- [x] Inspect the supplied AGUTS repository’s stated purpose, licence, and data sources.
- [x] Evaluate whether it provides real-time GSRTC data or only general transit implementation patterns.
- [x] Record safe-reuse guidance and a RoutePulse integration recommendation.

# Mock Live-Tracking Enhancement

- [x] Define mock route movements, timestamps, ETA states, and an explicit demo disclosure.
- [x] Implement route-specific mock tracking controls and animated vehicle positions.
- [x] Verify mock tracking states across desktop and mobile layouts.
- [x] Save the mock-tracking enhancement as a delivery checkpoint.

# Tracking UI Redesign

- [x] Define a clearer contemporary tracking layout and visual hierarchy.
- [x] Redesign the tracking workspace, controls, and status presentation.
- [x] Verify the refreshed interface on desktop and mobile.
- [x] Save the tracking redesign as a delivery checkpoint.

# Main Ticket-Booking Homepage Redesign

- [x] Define a focused booking-home hierarchy and refreshed RoutePulse visual language.
- [x] Redesign the hero, ticket search controls, and supporting journey information.
- [x] Verify the homepage at desktop and mobile breakpoints and confirm search navigation.
- [x] Save the homepage redesign as a delivery checkpoint.

# Autocomplete and Ticket Output Enhancements

- [x] Define demo city and station suggestions plus accessible keyboard selection behavior.
- [x] Implement source and destination autocomplete in the main booking form.
- [x] Enable demo ticket print, PDF download, and SMS-share actions with clear disclosure.
- [x] Verify autocomplete, ticket outputs, and responsive layouts.
- [x] Save the enhancement as a delivery checkpoint.

# Ticket Sharing Enhancement

- [x] Define sandbox-safe WhatsApp and email share payloads for the journey preview.
- [x] Add a Share Ticket menu with WhatsApp and email options to the confirmation page.
- [x] Verify sharing controls and responsive ticket layout.
- [x] Save the ticket-sharing enhancement as a delivery checkpoint.

# Station-Selection Fix

- [x] Reproduce the source and destination station-selection failure.
- [x] Correct the autocomplete state, keyboard behavior, and search-query handoff.
- [x] Verify station selection on desktop and mobile.
- [x] Save the station-selection fix as a delivery checkpoint.

# Autocomplete Dropdown Layout Fix

- [x] Identify the overlapping station-suggestion layout behavior.
- [x] Correct the source and destination suggestion containers and option sizing.
- [x] Verify contained autocomplete layouts on desktop and mobile.
- [x] Save the layout fix as a delivery checkpoint.

# Autocomplete Match Highlighting

- [x] Define case-insensitive highlight rendering for city and station names.
- [x] Add visual emphasis to matching suggestion text without altering option selection behavior.
- [x] Verify highlighted suggestions on desktop and mobile.
- [x] Save the autocomplete highlight enhancement as a delivery checkpoint.

# Real-World Transit Database Assessment

- [x] Locate authoritative GSRTC station, route, timetable, and service-number data sources and permissions.
- [x] Compare an authorised feed integration with a managed local reference database.
- [x] Define the backend, database, and refresh requirements for approved real-world data.
- [x] Present data-source and implementation options for user approval.

# Authorised GSRTC Feed Integration

- [ ] Collect official API, GTFS, or bulk-feed access details and permitted field scope.
- [ ] Upgrade RoutePulse with secure backend and database capabilities.
- [ ] Define import, validation, deduplication, and refresh rules for official transit data.
- [ ] Connect approved real-world stations, routes, service numbers, and schedules to the user interface.
- [ ] Verify data provenance, freshness metadata, and search results before delivery.

# No-API Data Source Decision

- [x] Identify lawful alternatives to a direct GSRTC API or feed.
- [x] Obtain the user’s preferred licensed data source or approval for a limited demo scope.

# Official Data-Access Request

- [x] Specify required transit data fields, technical questions, and compliance commitments.
- [x] Draft a send-ready GSRTC data-access request.

# Firebase Connection Setup

- [ ] Confirm a Firebase web app and Firestore or Realtime Database have been created in `new-gsrtc`.
- [x] Collect the Firebase web configuration for the `new-gstrc` project.
- [ ] Confirm the selected Firebase database product and approved security model.
- [ ] Prepare RoutePulse for secure Firebase connectivity and validate a controlled database read/write.

# GSRTC-Inspired Passenger App

- [x] Establish a clearly disclosed GSRTC-inspired app identity and demo-data boundaries.
- [x] Rebrand the booking and service-search interfaces for the new passenger app.
- [x] Rebrand journey documents, dashboard, and tracking surfaces consistently.
- [x] Verify responsive app flows and disclosure treatment across core pages.
- [x] Save the GSRTC-inspired passenger app checkpoint.

# Map-Led Journey Monitor

- [x] Define a Google Maps-style simulated navigation model with route, stop, and vehicle state.
- [x] Integrate the managed map view with route rendering and a moving demo bus marker.
- [x] Add responsive map controls, stop selection, and explicit simulated-data disclosure.
- [x] Verify desktop and mobile map interactions and save a delivery checkpoint.

# Passenger-Count Seat Limit Fix

- [x] Enforce the search passenger count as the maximum seat count in all seat selectors.
- [x] Give travellers clear feedback when their seat-selection limit is reached.
- [x] Verify one-passenger and multi-passenger selection handoff, then save a checkpoint.

# Group Passenger Details and Shared Ticket Contact

- [x] Require the selected seat count to exactly equal the searched passenger count before continuing.
- [x] Render one validated traveller-details form for every booked seat.
- [x] Collect one shared mobile number and email for ticket delivery instead of duplicate contacts per traveller.
- [x] Carry group travellers and the shared ticket contact into review and ticket preview.
- [x] Verify one, four, and five passenger flows, then save a checkpoint.

# Ticket Sharing and UPI App Preview

- [x] Add clearly labelled SMS and WhatsApp actions for sharing the passenger ticket preview.
- [x] Add Google Pay, PhonePe, and BHIM selections to the UPI payment preview without processing a transaction.
- [x] Validate shared preview payloads, payment disclosure, and responsive action layouts.

# Razorpay Test-Mode Integration

- [ ] Add secure Razorpay test credentials and document test/live settlement boundaries.
- [ ] Create server-side order creation, signature verification, and webhook-ready status handling.
- [ ] Connect the payment page to Razorpay Checkout and supported UPI flows.
- [ ] Validate sandbox success, failure, cancellation, and duplicate-webhook handling before checkpoint.

# Ticket UI Redesign

- [x] Establish a clearer ticket-document hierarchy with route identity, booking status, and passenger summary.
- [x] Redesign the ticket surface and output actions without removing SMS, WhatsApp, PDF, or print behavior.
- [x] Verify desktop and mobile ticket readability, then save a checkpoint.

# Printable PDF Ticket Redesign

- [x] Replace the sparse PDF output with a structured reservation-voucher layout.
- [x] Include booking, route, service, passenger, fare, contact, and instruction sections using live demo data.
- [x] Preserve original independent branding and a prominent non-travel disclaimer.
- [x] Validate the downloaded PDF and save a checkpoint.

# Realistic Journey Monitor Enhancement

- [x] Define realistic simulated vehicle states, road-following movement, and an explicit live-feed boundary.
- [x] Add variable speed, stop dwell, smooth progress, and ETA update behavior.
- [x] Improve map overlays for vehicle status, route deviation, and next-stop context.
- [x] Verify realistic tracking behavior on desktop and mobile, then save a checkpoint.
- [x] Add and validate an explicit simulated route-deviation/recovery state in the Journey Monitor overlay.
