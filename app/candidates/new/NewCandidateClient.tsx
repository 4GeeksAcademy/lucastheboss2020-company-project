"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CandidateForm from "../CandidateForm";
import { createCandidate } from "../../../src/candidates/api";
import type { CandidateWriteInput } from "../../../src/candidates/types";

export default function NewCandidateClient() {
  const router = useRouter();
  const [success, setSuccess] = useState("");

  async function handleSubmit(input: CandidateWriteInput) {
    const candidate = await createCandidate(input);
    setSuccess(`${candidate.companyName} was registered as a TrackFlow lead candidate.`);
    router.push(`/candidates/${candidate.id}`);
  }

  return (
    <section>
      <header className="page-header">
        <h1>Register a new candidate</h1>
        <p>Add an e-commerce company requesting TrackFlow warehouse, last-mile, or reverse logistics support.</p>
      </header>
      {success && <p className="message success">{success}</p>}
      <CandidateForm submitLabel="Create candidate" onSubmit={handleSubmit} />
      <p style={{ marginTop: "1rem" }}><Link href="/candidates">Back to pipeline</Link></p>
    </section>
  );
}
