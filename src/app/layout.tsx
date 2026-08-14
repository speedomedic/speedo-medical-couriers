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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://speedomedic.ca",
  "name": "Speedo Medical Couriers",
  "description": "Edmonton's dedicated medical courier service specializing in prescription delivery, lab specimen transport, and healthcare logistics across Edmonton and surrounding communities.",
  "url": "https://speedomedic.ca",
  "telephone": "+17808070000",
  "email": "speedomedical@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Edmonton",
    "addressRegion": "AB",
    "addressCountry": "CA",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.5461,
    "longitude": -113.4938,
  },
  "areaServed": [
    { "@type": "City", "name": "Edmonton" },
    { "@type": "City", "name": "St. Albert" },
    { "@type": "City", "name": "Sherwood Park" },
    { "@type": "City", "name": "Leduc" },
    { "@type": "City", "name": "Spruce Grove" },
    { "@type": "City", "name": "Fort Saskatchewan" },
    { "@type": "City", "name": "Beaumont" },
  ],
  "serviceType": [
    "Medical Courier",
    "Prescription Delivery",
    "Lab Specimen Transport",
    "Cold Chain Delivery",
    "STAT Medical Delivery",
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "description": "Contact us for current scheduling and availability",
  },
  "sameAs": [],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
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
