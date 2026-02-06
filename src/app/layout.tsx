import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeStats - Your Life in Numbers | How Many Heartbeats, Breaths & More",
  description: "Enter your birthday and discover 50+ mind-blowing statistics about your life. How many heartbeats? Breaths taken? Full moons witnessed? Miles traveled through space? Find out instantly — free.",
  keywords: [
    "life statistics calculator",
    "how many heartbeats have I had",
    "how many days old am I",
    "birthday statistics",
    "life in numbers",
    "seconds alive calculator",
    "how many breaths have I taken",
    "life stats from birthday",
    "personalized life statistics",
    "age calculator",
    "cosmic journey calculator",
    "how many full moons have I seen",
    "billion seconds club",
    "life milestones calculator",
  ],
  metadataBase: new URL("https://getlifestats.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LifeStats - Your Life in Numbers",
    description: "Enter your birthday. Discover 50+ mind-blowing statistics about your existence. Free, instant, shareable.",
    type: "website",
    url: "https://getlifestats.com",
    siteName: "LifeStats",
  },
  twitter: {
    card: "summary_large_image",
    title: "LifeStats - Your Life in Numbers",
    description: "How many heartbeats? Breaths? Full moons? Enter your birthday and find out instantly.",
    creator: "@ZeroShotTakes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LifeStats",
    url: "https://getlifestats.com",
    description: "Enter your birthday and discover 50+ mind-blowing statistics about your life.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
