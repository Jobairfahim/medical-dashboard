import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LumieraMed – Hospital Dashboard",
  description: "Medical placement management platform for hospitals",
  icons: {
    icon: "/images/logo.ico",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
