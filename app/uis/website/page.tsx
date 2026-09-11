import type { Metadata } from "next";
import WebsiteHome from "../../../uis/website/WebsiteHome";

export const metadata: Metadata = {
  title: "TrackFlow Logistics",
  description: "Warehouse management, last-mile delivery, and reverse logistics for e-commerce in the United States and Spain.",
};

export default function WebsiteRoute() {
  return <WebsiteHome />;
}
