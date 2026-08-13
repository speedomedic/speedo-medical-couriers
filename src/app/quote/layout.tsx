import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Quote | Speedo Medical Couriers | Edmonton, Alberta",
  description:
    "Request a custom medical courier quote — prescription delivery, specimen transport, cold chain, rush & STAT, and scheduled routes across Edmonton. No obligation, fast response.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
