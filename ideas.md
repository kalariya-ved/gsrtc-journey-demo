# RoutePulse Transit — Design Direction

## Ground-Truth Visual Specification

This project reproduces the supplied compact government transit portal composition with a crisp white utility header, a deep blue booking rail, an illustrated public-service hero, centered statistical tiles, two-up destination cards, a large information modal, and a full-bleed near-black navy footer. The page is desktop-dense at wide widths, while the mobile experience will convert the booking controls into touch-friendly stacked inputs and hide secondary utility links behind a compact menu.

## Chosen Approach: Civic Transit Portal

### Design Movement

Early-2010s Indian public-sector portal design, carefully refreshed for readability and responsive use while retaining the source page's compact hierarchy, administrative clarity, saturated blue visual anchor, bright red service actions, icon-led counts, and prominent modal state.

### Core Principles

The interface treats the booking rail as the primary task surface; keeps official information visible through strong section labeling; uses rectangular, economical components with only small corner rounding; and maintains a clearly tiered information density from utility header to booking controls to informative content blocks.

### Color Philosophy

RoutePulse blue is the stable public-service anchor for navigation, field labels, and section titles. A warm signal red marks actions and policy-related calls to attention, while white and cool gray leave operational content legible. Count cards retain discrete saturated colors because they help scan separate service metrics without creating an undifferentiated wall of blue.

### Layout Paradigm

The layout is a wide, full-bleed civic-information ribbon: thin utilities stack above a formal identity band, which leads into a full-width illustration and blue booking command rail. Content then resolves into centered, comparatively narrow information bands. This mirrors a service desk rather than a marketing landing page.

### Signature Elements

The page repeats a blue ribbon motif in the hero; simple square service symbols placed above data labels; and short chevron markers for service/policy links. The modal remains a visible interaction state and uses a strong shadow, red close control, and multilingual message separators.

### Interaction Philosophy

Interactions are direct, restrained, and task-oriented. Booking tabs visibly select, source and destination can be swapped on smaller screens, the modal closes with an obvious text control, and buttons respond with brief opacity and scale feedback. Non-functional demonstration actions communicate their status with an unobtrusive toast.

### Animation

Motion is short and practical: the modal fades and rises over 220ms; booking tabs and cards transition in 160–220ms; the hero ornament has a slow low-amplitude drift only when reduced motion is not requested. No continuous decorative motion competes with booking.

### Typography System

The display and navigation treatment uses **Roboto Condensed** for compact civic headings and controls. **Noto Sans** carries utility copy and body text, which supports multilingual text gracefully. Headings are heavy blue, while operational labels use medium weights with compact leading.

### Brand Essence

**RoutePulse Transit is a clear, dependable booking portal for everyday intercity travel, distinguished by public-service clarity and direct trip planning.** Its personality is dependable, practical, and approachable.

### Brand Voice

Headlines are factual and helpful; calls to action are brief, exact, and action-led. Example lines are: “Plan a reliable journey in minutes.” and “Search scheduled services.” Generic welcome language is excluded.

### Wordmark & Logo

The RoutePulse mark is a circular wheel-and-route emblem: a solid blue ring, a paired white road lane through its center, and a small warm-red waypoint. It uses a bespoke compact wordmark lockup rather than default text treatment.

### Signature Brand Color

**RoutePulse Blue — #064E8B** is the ownable anchor color across the booking rail, key headings, and logo.

## Verification Notes

The implemented desktop page preserves the reference's key visual sequence: two-line utility header, civic identity masthead, notice bar, illustrated hero, dark-blue booking rail, feedback-and-policy row, four colored metric tiles, tracking action row, two destination cards, compact dark footer, floating top control, and the visible important-information modal state. The modal creates the same dimmed-page visual hierarchy as the supplied capture, while remaining keyboard-accessible and closable.

## Style Decisions

Results and listing pages retain the Civic Transit Portal character through flat rectangular panels, strong RoutePulse Blue labels, visible rule lines, compact administrative density, and square service symbols rather than a soft marketplace-card treatment. The RoutePulse identity uses the wheel-and-route mark as part of an official compact lockup, with RoutePulse Blue carrying navigation, metadata, and section hierarchy. Warm signal red remains limited to primary booking actions and urgent notices.

The refined desktop search-results screen verifies this system in practice: the reinforced RoutePulse lockup, blue summary band, filter panel, section rule, service rows, amenity rails, and boxed route-status metadata read as a consistent formal service surface. Filter labels are aligned and readable, and red is limited to the seat-selection action.

The multi-page traveller journey extends this same system through compact blue progress rails, square service symbols, strong RoutePulse Blue panel anchors, boxed operational metadata, and restrained red primary actions. Ticket and account surfaces reuse the wheel-and-route emblem as an official document/service seal. The live-tracking surface provides a deterministic labelled route graphic whenever a live map is not available, preserving a useful visual tracking context while clearly identifying the location as a demo.

The demo search filters use the same formal service-desk treatment. Verification confirms that selecting the AC bus-type filter changes the visible service count from five to three and exposes an active-filter count beside the results label.

Combining the AC type filter with the ₹400–₹500 fare band further narrows the sample list to the single ₹489 RoutePulse Express service. The mobile results layout preserves the compact toolbar and Filter entry point without horizontal overflow; the same filter grouping is available through the responsive drawer.

The results-page Select seats action now opens an in-page dummy coach modal. It presents available, selected, booked, and reserved states, a preselected available seat, per-service boarding and dropping fields, and an explicitly labelled demo continuation action without implying a real reservation.

Interaction verification confirms that adding a second available seat updates the selected-seat summary and fare total from ₹338 to ₹676. Continuing transfers the selected seat identifiers into the passenger-details route, where they remain visible in the booking summary.

The tracking view applies a denser civic service-desk hierarchy: inner pages have a thin authority utility band, strong RoutePulse Blue structural bands, formal update labels, and a branded blue route rail with official waypoint markers. Simulated data remains conspicuously labelled through a blue public-service notice; signal red is reserved for the active vehicle-seal ring and immediate intervention emphasis.

Desktop verification confirms the branded tracking rail, formal service notice, compact control band, simulated status panel, and route-progress rail form a cohesive civic-service layout. Mobile verification confirms the controls stack into clear full-width actions and the route map, status panel, support contact, and route facts remain readable without horizontal overflow.

## Style Decisions

The tracking page is now treated as a **Journey Monitor** rather than an administrative dashboard: one dark route hero establishes context, one generous route canvas carries the primary attention, and supporting information sits in quiet white cards. Rounded corners are reserved for a small number of key interactive containers; component density is achieved through typography, grouping, and hierarchy instead of excess borders. The mock disclosure is explicit but restrained so it does not compete with the route itself.

The final tracking treatment favours flat, rule-led civic materials around the hero. Roboto Condensed now dominates route names, controls, status headings, and operational labels. The RoutePulse wheel-and-route emblem repeats as a service seal on the vehicle and arrival status, while the red accent is reserved for the active vehicle ring and official arrival rule.

## Booking Home v2 Direction

The main booking page becomes a **Journey Planner**: a dark, focused RoutePulse route hero carries the brand and travel promise, while the booking form becomes the dominant immediate task in a white, red-topped card. Supporting information is reduced to three practical assurances, route shortcuts, and a single service strip. The red accent marks the booking action and authoritative notice edges; RoutePulse Blue carries navigation, route information, and all structural hierarchy.

The hero visual has been replaced with a branded RoutePulse service-grid schematic, using labelled corridor stations, blue route rails, a red-edged active coach seal, and operational network figures. Booking language is factual and task-forward: scheduled services, seat selection, and journey details. The search card retains priority over the hero through its overlap, clear red action, and administrative blue rules.

Final verification confirms that the booking card remains the dominant task surface on desktop, with the route grid acting as an official supporting panel. The mobile page keeps the same booking-first order: service headline, route system visual, search form, assurances, corridors, and support links all remain readable without horizontal overflow.

The ticket preview now follows the same document-system rules as the booking page: its primary reading order is journey document, RoutePulse service-network seal, route schematic, passenger facts, and fare. The sandbox message remains present but secondary to the official document treatment. The active service marker and route rail repeat the service-grid motif used on the booking home.

The booking form now provides compact city-and-station suggestions with mouse and keyboard selection semantics. Ticket output is explicitly sandbox-labeled: printing uses the browser print workflow, PDF downloads are generated locally as a preview document, and SMS creates a shareable message draft without sending any message. Desktop and mobile verification confirms that the form, document facts, disclosure, and output controls remain readable without horizontal overflow.

The ticket action row now includes an accessible Share Ticket control that reveals clear WhatsApp and email choices. Both share payloads retain the sandbox-not-valid-for-travel notice, ensuring that external sharing never represents a genuine GSRTC reservation. The control remains balanced within both desktop and mobile ticket action layouts.

The location selector now commits a source or destination option on pointer interaction before focus blur can dismiss the suggestion list. Arrow-key navigation is guarded for empty result sets, while Enter still commits the highlighted station. The desktop and mobile booking layouts remain stable after this interaction fix.

The autocomplete list is now explicitly excluded from the generic booking-field flex rule. Each station selector is a contained block with its own absolute, scrollable suggestion surface and grid-based option rows, preventing option content from inheriting form-field dimensions or overlapping the source/destination controls. Desktop and mobile screenshots confirm the base booking grid remains clean after the containment fix.

Autocomplete suggestions now render typed, case-insensitive matches within city names and station details as a high-contrast warm marker. The marker shifts to a blue state when an option is highlighted by keyboard or hover, preserving clear selection focus while improving scan speed. The booking interface remains stable at both desktop and mobile breakpoints.

Final verification confirms that the Journey Monitor keeps one clear primary route canvas, a compact status summary, and a direct service-data notice on desktop. The mobile view preserves this reading order by stacking the hero controls, route canvas, arrival card, timeline, and notice without horizontal overflow.

## Active GSRTC-Inspired Identity

The active identity is **GSRTC Journey Demo**, an **independent GSRTC-inspired passenger-app prototype**. It adopts a practical, task-first civic-transit language—deep service blue, signal-red primary actions, Roboto Condensed operational headings, Noto Sans body copy, structured booking rails, and rectangular information surfaces—without using an official GSRTC logo, official mark, or official source data.

The original wheel-and-route symbol remains an independent app mark. Every material journey surface must explicitly distinguish **sample** services, illustrative fares, simulated tracking, and non-travel ticket output from a real operator service. The persistent brand promise is: **“An independent journey-planning prototype for Gujarati intercity travel, designed for clear booking decisions before authorised operator data is connected.”** Its personality is **practical, transparent, and civic-minded**.

Headlines should be factual and bounded, such as “Scheduled services. Seat selection. Journey ready.” and “Independent demo data: compare sample departures.” Calls to action use “Search sample services,” “Choose sample seats,” and “Generate booking preview,” never language that implies an actual ticket, payment, reservation, official affiliation, or live GSRTC feed.

The compact lockup follows the civic-wordmark rule: **GSRTC Journey** is paired with a visible **Demo** tag and an adjacent **Independent Prototype · Demo Data** descriptor. Search results reinforce the shared route-rail language through a labelled GJ Demo corridor notice, while the Journey Monitor uses only simulated, sample, and demo-feed framing.

Payment previews use the same blue-ledger, route-reference, service-seal language as the ticket document. UPI, card, wallet, and banking choices are clearly sample service-desk controls, never a live checkout.

Ticket output controls are presented as controlled demo document outputs and repeat the non-travel, no-reservation, no-money-collected boundary.
