import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrackFlow Lead Candidates",
  description: "TrackFlow lead-candidate pipeline for e-commerce logistics opportunities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <Link className="brand" href="/candidates">
            TrackFlow Candidates
          </Link>
          <nav className="actions" aria-label="Primary navigation">
            <Link className="button secondary" href="/candidates">
              Pipeline
            </Link>
            <Link className="button" href="/candidates/new">
              New candidate
            </Link>
          </nav>
        </header>
        <main className="shell">{children}</main>
      </body>
    </html>
  );
}
