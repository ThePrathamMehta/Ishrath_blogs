import type { Metadata } from "next";
import { Inter_Tight, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://theinkwell.com'),
  title: {
    default: "The Inkwell | Literature & Culture",
    template: "%s | The Inkwell",
  },
  description: "Deep dives into the printed word and the modern human condition as seen through journalism. A journal of literature, culture, and real life.",
  keywords: [
    "literature",
    "culture",
    "journalism",
    "essays",
    "book reviews",
    "literary criticism",
    "cultural commentary",
    "gonzo journalism",
    "contemporary fiction",
    "literary theory",
  ],
  authors: [{ name: "The Inkwell" }],
  creator: "The Inkwell",
  publisher: "The Inkwell",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "The Inkwell",
    title: "The Inkwell | Literature & Culture",
    description: "Deep dives into the printed word and the modern human condition as seen through journalism.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Inkwell - Literature & Culture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Inkwell | Literature & Culture",
    description: "Deep dives into the printed word and the modern human condition as seen through journalism.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${interTight.variable} ${playfairDisplay.variable} font-secondary bg-white text-gray-900 antialiased overflow-x-hidden selection:bg-red-100 selection:text-red-900`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
