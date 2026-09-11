import { Suspense } from "react";
import CandidateListClient from "./CandidateListClient";

export default function CandidatesPage() {
  return (
    <Suspense fallback={<p className="message loading">Loading TrackFlow candidates...</p>}>
      <CandidateListClient />
    </Suspense>
  );
}
