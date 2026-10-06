import type { Metadata, Viewport } from "next";
import "@fontsource-variable/schibsted-grotesk";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/400-italic.css";
import "@fontsource/newsreader/500-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fermor — See the math before you sign",
  description:
    "Free calculators for India that show every step of the working. SIP, EMI, FD, tax and more. Your numbers stay on your device.",
  openGraph: {
    title: "Fermor — See the math before you sign",
    description: "Free calculators for India that show every step of the working.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f5f2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
