import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./Navigation";
import { AuthProvider } from "./auth/AuthProvider";

export const metadata: Metadata = {
  title: "TrackFlow Lead Candidates",
  description: "TrackFlow lead-candidate pipeline for e-commerce logistics opportunities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navigation />
          <main className="shell">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
