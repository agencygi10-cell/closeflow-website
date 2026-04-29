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
  title: "CloseFlow System | El partner que organiza tu caos y multiplica tus ventas",
  description:
    "Sistema CRM completo para estudios de tatuaje y centros de belleza que quieren escalar. GoHighLevel, Meta Ads y asesorías para multiplicar tus ventas.",
  keywords: [
    "CRM",
    "GoHighLevel",
    "Meta Ads",
    "estudios de tatuaje",
    "centros de belleza",
    "automatización ventas",
    "CloseFlow",
    "marketing digital",
    "California",
  ],
  authors: [{ name: "CloseFlow System" }],
  metadataBase: new URL("https://closeflow.system"),
  openGraph: {
    title: "CloseFlow System | Organiza tu caos y multiplica tus ventas",
    description:
      "Sistema CRM completo para estudios de tatuaje y centros de belleza que quieren escalar.",
    type: "website",
    locale: "es_ES",
    siteName: "CloseFlow System",
  },
  twitter: {
    card: "summary_large_image",
    title: "CloseFlow System",
    description:
      "El partner que organiza tu caos y multiplica tus ventas.",
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
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
