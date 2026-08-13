import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIChatWidget from "@/components/AIChatWidget";

export const metadata: Metadata = {
  title: "Speedo Medical Couriers | Edmonton's Dedicated Medical Courier",
  description:
    "Edmonton's trusted medical courier service. Prescription delivery, lab specimens, medical equipment — 7 days a week across Edmonton, St. Albert, Sherwood Park, Leduc, Spruce Grove, Fort Saskatchewan, Beaumont, and Red Deer.",
  keywords: [
    "medical courier Edmonton",
    "prescription delivery Edmonton",
    "lab specimen transport",
    "pharmaceutical courier Alberta",
    "same day medical delivery",
  ],
  openGraph: {
    title: "Speedo Medical Couriers",
    description: "Precision medical courier delivery across Edmonton & surrounding areas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
        <WhatsAppButton />
        <AIChatWidget />
      </body>
    </html>
  );
}
