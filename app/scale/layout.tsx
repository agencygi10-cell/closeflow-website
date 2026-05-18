import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scale your tattoo income | CloseFlow System",
  description:
    "Done-for-you ads + booking system for tattoo artists. Add $8K–$30K/month with a 15x to 32x ROAS in under 90 days. Book a free strategy call.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Scale your tattoo income — CloseFlow System",
    description:
      "Done-for-you growth system for tattoo artists. Book a free strategy call.",
    type: "website",
    locale: "en_US",
  },
};

export default function ScaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
