import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammad-hafeez.dev"),
  title: {
    default: "Muhammad Hafeez | AI Engineer & Software Developer",
    template: "%s | Muhammad Hafeez"
  },
  description: profile.seo,
  keywords: [
    "Muhammad Hafeez",
    "AI Engineer",
    "Software Developer",
    "Full Stack Developer",
    "Python Developer",
    "Flask Developer",
    "AI Portfolio",
    "React Developer",
    "PostgreSQL Developer"
  ],
  authors: [{ name: profile.name, url: "https://github.com/haffey041707" }],
  creator: profile.name,
  openGraph: {
    title: "Muhammad Hafeez | AI Engineer & Software Developer",
    description: profile.seo,
    type: "website",
    locale: "en_US",
    siteName: "Muhammad Hafeez Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hafeez | AI Engineer & Software Developer",
    description: profile.seo
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050711",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
