# Request for Authorised Transit Data Access for RoutePulse

**To:** GSRTC Customer Support / IT / Data or Digital Services Team  
**Subject:** Request for authorised access to GSRTC station, route, timetable, and service data

Dear GSRTC Team,

I am developing **RoutePulse**, a passenger-facing journey-planning and ticket-booking prototype for intercity bus travel. I would like to request guidance on obtaining **authorised access** to GSRTC operational reference data for a secure, non-scraping integration.

The proposed use is to help passengers search available services by source, destination, date, and passenger count, then display clear service information. RoutePulse will not represent any information as official or current unless GSRTC explicitly authorises the data source and update process.

## Requested Data Scope

Please let me know whether GSRTC can provide, licence, or direct me to an approved source for the following fields:

| Data area | Requested fields |
| --- | --- |
| Stops and stations | Official station/depot name, stop identifier, latitude/longitude, address, district, and active status |
| Routes | Route identifier, route name, source, destination, ordered stops, route geometry where available, and service category |
| Scheduled services | Service/trip number, vehicle/service type, departure and arrival times, operating days, boarding and dropping points, and trip validity dates |
| Fares and availability | Fare rules or published fares, concession rules where permitted, and seat availability only if approved for third-party display |
| Live service data | Vehicle position, ETA, service alerts, delays, cancellations, and update timestamps, if an approved real-time interface exists |

## Preferred Delivery Formats

An API is preferred, but a **GTFS ZIP**, CSV/XLSX export, or other documented bulk feed would also be suitable. Please include, where applicable, the endpoint or file-delivery method, authentication approach, data dictionary, update frequency, rate limits, permitted display/use, retention rules, attribution requirements, and commercial or licence terms.

## Security and Compliance Commitment

Any approved credentials would be stored only in a secure server-side environment and would not be exposed in the browser. I will implement provenance and “last updated” information for imported data, honour required attribution, and follow all agreed access, storage, redistribution, privacy, and security requirements.

Please advise the appropriate contact person, process, and any application or agreement required to proceed.

Thank you for your guidance.

Sincerely,  
**[Your name]**  
**[Your email address]**  
**[Your phone number, if desired]**  
**RoutePulse project**
