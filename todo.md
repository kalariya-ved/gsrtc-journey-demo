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
- [ ] Rebrand journey documents, dashboard, and tracking surfaces consistently.
- [ ] Verify responsive app flows and disclosure treatment across core pages.
- [ ] Save the GSRTC-inspired passenger app checkpoint.
