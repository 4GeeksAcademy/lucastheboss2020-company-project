import CandidateListPage from "@/components/candidate-list-page";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div className="tracker-shell">Loading tracker...</div>}>
      <CandidateListPage />
    </Suspense>
  );
}
