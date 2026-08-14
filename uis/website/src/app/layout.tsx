import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAB Restoration | New York Masonry & Waterproofing",
  description:
    "PAB Restoration is a New York construction company specializing in pointing, caulking, and exterior waterproofing.",
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
