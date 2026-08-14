import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAB Backoffice",
  description: "Internal operations dashboard for PAB Restoration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
