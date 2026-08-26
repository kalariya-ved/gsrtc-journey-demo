import { describe, expect, it } from "vitest";
import { buildTicketShareText } from "./ticketContent";

describe("buildTicketShareText", () => {
  it("includes every passenger seat and the single shared ticket contact", () => {
    const text = buildTicketShareText({
      reference: "GJ-DEMO-82467",
      source: "Ahmedabad",
      destination: "Vadodara",
      departure: "06:30",
      arrival: "12:20",
      travellers: [
        { name: "Asha Patel", seat: "A3" },
        { name: "Ravi Patel", seat: "B2" },
      ],
      contactMobile: "9876543210",
      contactEmail: "family@example.com",
    });

    expect(text).toContain("GJ-DEMO-82467");
    expect(text).toContain("Ahmedabad 06:30 → Vadodara 12:20");
    expect(text).toContain("Asha Patel · Seat A3");
    expect(text).toContain("Ravi Patel · Seat B2");
    expect(text).toContain("9876543210 · family@example.com");
    expect(text).toContain("not affiliated with GSRTC and not valid for travel");
  });
});
