# GSRTC Real-Time Data Assessment

## Verified Public Evidence

The official GSRTC Android application describes public passenger-facing features for bus schedules, fares, routes, bus status, and origin-to-destination searches. Its Google Play listing does **not** publish a developer API, request format, API key process, data licence, or third-party integration terms. The listing identifies the app as the official booking application and directs users to a support address, rather than an API portal. [1]

The iOS listing for **GSRTC Live Tracking**, published by Amnex Infotechnologies Private Limited, states that it provides real-time ETA at en-route stations and exact locations of running GSRTC vehicles on a map, alongside station search and schedules. The public listing similarly provides no third-party developer API documentation, API credentials, data-sharing terms, or integration onboarding process. [2]

Directly opening the supplied `jqreq.do?hiddenAction=SearchServiceForHome` endpoint separately produces an “Invalid URL Detected” response. This shows that the endpoint is session/form-bound and is not a stand-alone public integration API.

## Recommendation

RoutePulse should **not** scrape, replay, or reverse-engineer GSRTC app/web requests. An authorized real-time integration would require written permission or a documented partner API/feed from GSRTC or its authorised technology provider, including credential management, permitted fields, rate limits, update cadence, retention, privacy obligations, and commercial terms. Because the existing application is static, a permitted live feed would also require a backend and database/proxy layer; browser-side calls would expose credentials and lack secure caching, access controls, and auditability.

## Community Repository Review

The supplied repository, [`RiyaTalwar/GSRTC-Bus-Reservation-System`](https://github.com/RiyaTalwar/GSRTC-Bus-Reservation-System), identifies itself as a **database-management project** for a bus reservation system. The documented contents are an ER diagram, relational schema, functional dependencies, DDL, SQL queries, stored procedures, and a C console application. Its SQL directory contains local entity scripts such as `bus.sql`, `bus_schedule.sql`, `route.sql`, `passenger.sql`, `booking_details.sql`, and `has_fare_for.sql`; these are a useful conceptual starting point for a transit-reservation domain model, not a real-time connector.

The visible repository has no `LICENSE` file, no API client, no network/service integration code, and no stated data authority. Its last visible commits are from 2018. It therefore cannot provide live GSRTC schedules, inventory, ETAs, or vehicle positions. The schema concepts may be independently reimplemented after clarifying data ownership and source terms, but the repository’s code or scripts should not be copied into RoutePulse without permission from the author and a licence review.

## AGUTS Repository Review

The supplied [`https-hari/AGUTS`](https://github.com/https-hari/AGUTS) repository is a more comprehensive **academic/database-system reference** for Ahmedabad–Gandhinagar multimodal transport. Its README describes a PostgreSQL schema spanning 27 relations for operators, routes, stops, fleet, staff, trips, fares, passengers, tickets, passes, and complaints, with a role-based C++/libpq console application. It lists GSRTC as an inter-city operator alongside GMRC, BRTS, and AMTS.

The visible `sql` directory contains only `DDL_Scripts.sql`, `AGUTS_INSERT_Script.sql`, and `queries.sql`; no API client, ingestion worker, GTFS/GTFS-RT feed, tracker integration, or external data credentials are exposed. The visible file list also has no `LICENSE` file. The repository is therefore a strong reference for independently designing a **normalised, multimodal internal database**, but it is not an authorised real-time GSRTC source and cannot be used to populate live schedules, seats, or locations without an official feed. Any implementation should adopt the architectural ideas rather than copy material until the author provides an applicable licence.

## Sources

[1]: https://play.google.com/store/apps/details?id=com.gsrtc.mobileweb&hl=en_US "GSRTC — Google Play"
[2]: https://apps.apple.com/in/app/gsrtc-live-tracking/id6476297992 "GSRTC Live Tracking — App Store"
[3]: https://github.com/RiyaTalwar/GSRTC-Bus-Reservation-System "GSRTC-Bus-Reservation-System — GitHub"
[4]: https://github.com/https-hari/AGUTS "AGUTS — GitHub"
