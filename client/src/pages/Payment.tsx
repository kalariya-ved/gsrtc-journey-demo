/** GSRTC Journey Demo design: clearly labelled independent payment preview with formal method selectors and no real transaction. */
import { useState } from "react";
import { ArrowRight, Building2, CreditCard, Landmark, ShieldCheck, Smartphone, WalletCards } from "lucide-react";
import { useLocation } from "wouter";
import { BookingShell, JourneyMiniCard } from "@/components/BookingShell";

const methods = [{ id: "upi", label: "UPI", icon: Smartphone }, { id: "card", label: "Credit / Debit Card", icon: CreditCard }, { id: "bank", label: "Net Banking", icon: Landmark }, { id: "wallet", label: "Demo Wallet", icon: WalletCards }];

export default function Payment() {
  const [, navigate] = useLocation();
  const [method, setMethod] = useState("upi");
  const params = new URLSearchParams(window.location.search);
  const seats = params.get("seats") || "A3";
  const total = seats.split(",").filter(Boolean).length * 489 + 24;
  const base = window.location.search.replace(/^\?/, "");
  return <BookingShell step="payment" eyebrow="Payment preview" title="Choose a demo payment method"><div className="payment-layout"><section className="payment-panel"><div className="sandbox-banner"><ShieldCheck /><div><b>Independent demo mode</b><p>This GSRTC-inspired prototype is not affiliated with GSRTC. It does not collect money or create a real ticket.</p></div></div><div className="payment-methods"><h2>Sample payment method</h2>{methods.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setMethod(id)} className={method === id ? "payment-method is-selected" : "payment-method"}><Icon /><span>{label}</span><i /></button>)}</div><div className="payment-input-preview"><label>{method === "upi" ? "UPI ID" : method === "card" ? "Card details" : method === "bank" ? "Choose bank" : "Wallet number"}<input disabled value={method === "upi" ? "traveller@demo" : method === "card" ? "4111 1111 1111 1111" : method === "bank" ? "Demo national bank" : "DEMO-100-002"} /></label><small>Example-only field; no payment credential is requested or stored.</small></div></section><aside className="payment-summary-card"><JourneyMiniCard seats={seats} /><div className="payment-total"><span>Demo amount</span><strong>₹{total}</strong></div><button onClick={() => navigate(`/ticket?${base}&mode=sandbox`)} className="primary-booking-button">Generate booking preview <ArrowRight /></button><p><Building2 />No funds will be debited in demo mode.</p></aside></div></BookingShell>;
}
