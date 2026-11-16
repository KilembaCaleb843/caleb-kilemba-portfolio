import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://caleb-kilemba-portfolio.vercel.app";
const description = profile.intro;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — Data Engineer`,
  description,
  openGraph: {
    title: `${profile.name} — Data Engineer`,
    description,
    type: "website",
    url: siteUrl,
  },
  twitter: { card: "summary", title: `${profile.name} — Data Engineer`, description },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
