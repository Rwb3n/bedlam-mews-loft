import type { Metadata } from "next";
import { Castoro, Montserrat } from "next/font/google";
import "./globals.css";

const castoro = Castoro({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-castoro",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
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
      <body
        className={`${castoro.variable} ${montserrat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
