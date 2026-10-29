import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://today-in-gfw.vercel.app"),
  title: "Today in GFW · Your community, in context",
  description: "A source-transparent community briefing and calendar for Grand Falls-Windsor.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Today in GFW — Your community, in context",
    description: "Stories, events and decisions shaping Grand Falls-Windsor.",
    type: "website",
    images: [{ url: "/assets/social-card.png", width: 1200, height: 630, alt: "Today in GFW – Your community, in context" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><meta name="theme-color" content="#153e43" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet" /></head><body>{children}</body></html>;
}
