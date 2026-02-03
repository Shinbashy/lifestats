import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeStats - Your Life in Numbers",
  description: "Discover fascinating statistics about your life. How many heartbeats? How many breaths? How many full moons have you seen? Enter your birthday and find out!",
  keywords: ["life stats", "birthday calculator", "life statistics", "heartbeats", "days alive", "seconds alive"],
  openGraph: {
    title: "LifeStats - Your Life in Numbers",
    description: "Discover fascinating statistics about your life journey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LifeStats - Your Life in Numbers",
    description: "Discover fascinating statistics about your life journey",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
