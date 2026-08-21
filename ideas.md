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
