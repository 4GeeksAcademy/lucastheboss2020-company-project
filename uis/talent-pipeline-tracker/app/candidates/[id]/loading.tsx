import Link from "next/link";

export default function CandidateDetailLoading() {
  return (
    <div className="tracker-shell">
      <header className="tracker-header">
        <div>
          <p className="eyebrow">TrackFlow · Candidate detail</p>
          <h1>Candidate detail</h1>
          <p className="subtle">
            Loading candidate profile, status, and latest updates.
          </p>
        </div>
        <Link href="/" className="link-button">
          Back to list
        </Link>
      </header>

      <section className="tracker-panel">
        <h2>Candidate profile</h2>
        <p className="subtle">Loading candidate information...</p>
      </section>
    </div>
  );
}
