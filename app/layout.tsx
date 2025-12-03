import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat, Cinzel, Prata, Quintessential } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const quintessential = Quintessential({
  variable: "--font-quintessential",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grandeur Hotel - Experience Unparalleled Luxury & Excellence",
  description: "Discover a world of timeless elegance, sophisticated design, and exceptional hospitality at Grandeur Hotel. Book your unforgettable luxury stay today and experience 5-star service that exceeds expectations.",
  keywords: ["luxury hotel", "5-star hotel", "premium accommodation", "boutique hotel", "hotel booking", "luxury stay"],
  openGraph: {
    title: "Grandeur Hotel - Luxury Accommodation",
    description: "Experience unparalleled luxury and sophistication",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${montserrat.variable} ${prata.variable} ${cinzel.variable} ${quintessential.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
