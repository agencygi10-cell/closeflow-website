import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "CloseFlow System | The growth partner for tattoo artists",
  description:
    "Growth agency for tattoo artists. Meta Ads, CRM, content direction and automation. 15x to 32x ROAS — all in one place.",
  keywords: [
    "tattoo artists agency",
    "Meta Ads",
    "tattoo marketing",
    "CRM",
    "marketing automation",
    "CloseFlow",
    "California",
    "tattoo growth",
  ],
  authors: [{ name: "CloseFlow System" }],
  metadataBase: new URL("https://closeflow.system"),
  openGraph: {
    title: "CloseFlow System | We scale tattoo artists",
    description:
      "Growth agency for tattoo artists. 15x to 32x ROAS in under 90 days.",
    type: "website",
    locale: "en_US",
    siteName: "CloseFlow System",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloseFlow System",
    description:
      "Growth agency for tattoo artists. 15x to 32x ROAS in under 90 days.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
