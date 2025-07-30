import type { Metadata } from "next";
import { Sorts_Mill_Goudy, Geist } from "next/font/google";
import "./globals.css";
import ScrollSmootherInit from "./components/ScrollSmoother";

const geist = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist",
  display: "swap",
});

const sortsMillGoudy = Sorts_Mill_Goudy({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-sorts-mill-goudy",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Bedlam Mews Loft | Rehearsal Space London",
  description: "Creative rehearsal space in central London. Perfect for acting workshops, classes, meetups. Book now £30/hour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geist.variable} ${sortsMillGoudy.variable} font-sans antialiased`}
      >
        <ScrollSmootherInit />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
