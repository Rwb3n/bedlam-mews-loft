import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import ScrollSmootherInit from "./components/ScrollSmoother";

const geist = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-inter",
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
        className={`${geist.variable} ${inter.variable} font-sans antialiased`}
      >
        {/* ScrollSmootherInit disabled for sticky test */}
        {/* <ScrollSmootherInit /> */}
        {/* <div id="smooth-wrapper"> */}
          {/* <div id="smooth-content"> */}
            {children}
          {/* </div> */}
        {/* </div> */}
      </body>
    </html>
  );
}
