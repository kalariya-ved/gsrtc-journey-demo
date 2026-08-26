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

## Current Official Public Data Scope Check

On 26 August 2026, the public GSRTC website exposes a passenger search interface with source, destination, travel date, passenger count, and a search action. It also lists customer-support and refund contacts, but its public homepage does not publish a developer portal, data-download page, GTFS feed, API documentation, or data licence. [5]

The official Google Play listing describes the GSRTC application as providing schedules, fares, bus status, available buses between a start and end destination, and route details. The listing's organisation description states that GSRTC has 16 divisions, 129 depots, 226 bus stations, and more than 8,000 buses. It does not state that these data are available as a third-party database, public data feed, or developer API. [6]

### Implication for RoutePulse

The official public surfaces confirm that comprehensive operational data exists, but they do not authorise RoutePulse to copy, scrape, or sync it. A full real-world RoutePulse database needs an authorised bulk source or API agreement that explicitly covers stops, geographic coordinates, routes, trip/service numbers, schedules, fare data, update cadence, redistribution rights, and privacy/security terms.

[5]: https://gsrtc.in/site/ "GSRTC official website"
[6]: https://play.google.com/store/apps/details?id=com.gsrtc.mobileweb&hl=en_US "GSRTC — Google Play"

## Public Dataset Search Outcome

A search of public dataset catalogues on 26 August 2026 did not identify a verified, official GSRTC bulk dataset or GTFS/GTFS-Realtime feed covering the requested stations, locations, routes, trip numbers, and timetables. Search results point to the official website/application and unrelated or third-party timetable listings, rather than a GSRTC data download or documented API. [7]

### Viable Implementation Paths

| Approach | Outcome | Data rights and freshness | Project change |
| --- | --- | --- | --- |
| Authorised official feed | RoutePulse stores and searches official stops, route geometry, scheduled trips, service numbers, and fares; it can refresh through the documented feed cadence. | Requires GSRTC or its authorised provider to grant API/GTFS/bulk-feed access and redistribution permission. | Upgrade the site to a secure backend/database application; use server-side credentials and a controlled import/refresh job. |
| User-supplied licensed reference file | RoutePulse imports a CSV, XLSX, GTFS ZIP, or other licensed database supplied by the user, with status shown as “last updated” rather than live. | The user must confirm that the supplied file may be stored and used in RoutePulse. Freshness follows future file updates. | Upgrade the site to a secure backend/database application and provide an import/validation interface. |

[7]: https://gsrtc.in/site/ "GSRTC official website and public dataset search results" 
