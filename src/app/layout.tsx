import type { Metadata } from "next";
import { Castoro } from "next/font/google";
import "./globals.css";

const castoro = Castoro({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-castoro",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${castoro.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
