import { Suspense } from "react";
import BackofficeHome from "../../../uis/backoffice/BackofficeHome";

export default function BackofficeRoute() {
  return <Suspense fallback={<p>Loading TrackFlow lead candidates...</p>}><BackofficeHome /></Suspense>;
}
