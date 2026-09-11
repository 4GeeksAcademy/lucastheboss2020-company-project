import Link from "next/link";
import type { TrackerRecordListResponse } from "../../src/candidates/types";

const TRACKER_RECORDS_URL = "https://playground.4geeks.com/tracker/api/v1/records";
const PAGE_SIZE = 20;

type SearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

function pageNumber(value: string): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

async function fetchTrackerRecords(searchParams: SearchParams): Promise<TrackerRecordListResponse> {
  const query = new URLSearchParams({ page: String(pageNumber(firstValue(searchParams.page))), limit: String(PAGE_SIZE) });

  for (const parameter of ["status", "stage", "search"] as const) {
    const value = firstValue(searchParams[parameter]).trim();
    if (value) query.set(parameter, value);
  }

  const response = await fetch(`${TRACKER_RECORDS_URL}?${query}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Talent pipeline records are unavailable.");
  return response.json() as Promise<TrackerRecordListResponse>;
}

export default async function BackofficeHome({ searchParams }: { searchParams: SearchParams }) {
  const records = await fetchTrackerRecords(searchParams);
  const search = firstValue(searchParams.search);
  const status = firstValue(searchParams.status);
  const stage = firstValue(searchParams.stage);
  const page = pageNumber(firstValue(searchParams.page));
  const totalPages = Math.max(1, Math.ceil(records.total / records.limit));

  return (
    <section>
      <header className="page-header">
        <span className="badge green">Talent Pipeline Tracker</span>
        <h1>Candidate backoffice</h1>
        <p>Search and review live talent-pipeline records by candidate, recruitment status, and pipeline stage.</p>
        <div className="actions">
          <Link className="button secondary" href="/candidates">TrackFlow lead pipeline</Link>
          <Link className="button secondary" href="/uis/website">View public website</Link>
        </div>
      </header>

      <form className="filters panel" action="/uis/backoffice">
        <div className="field">
          <label htmlFor="search">Search</label>
          <input defaultValue={search} id="search" name="search" placeholder="Name, email, or position" type="search" />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <input defaultValue={status} id="status" name="status" placeholder="e.g. active" />
        </div>
        <div className="field">
          <label htmlFor="stage">Stage</label>
          <input defaultValue={stage} id="stage" name="stage" placeholder="e.g. interview" />
        </div>
        <button type="submit">Search records</button>
      </form>

      <section className="candidate-grid" aria-label="Talent pipeline summary">
        <article className="panel">
          <h2>Matching records</h2>
          <p><strong>{records.total}</strong> candidates found</p>
          <p>Page {records.page} of {totalPages}</p>
        </article>
      </section>

      <section className="panel" style={{ marginTop: "1rem" }}>
        <h2>Candidate focus list</h2>
        {records.data.length === 0 && <p>No candidates match the current search.</p>}
        <ul>
          {records.data.map((candidate) => (
            <li key={candidate.id}>
              <strong>{candidate.full_name}</strong> · {candidate.position} · {candidate.status} · {candidate.stage} · {candidate.experience_years ?? "Unknown"} years experience
            </li>
          ))}
        </ul>
        <div className="actions">
          {page > 1 && <Link className="button secondary" href={`/uis/backoffice?${new URLSearchParams({ ...(search && { search }), ...(status && { status }), ...(stage && { stage }), page: String(page - 1) })}`}>Previous</Link>}
          {page < totalPages && <Link className="button secondary" href={`/uis/backoffice?${new URLSearchParams({ ...(search && { search }), ...(status && { status }), ...(stage && { stage }), page: String(page + 1) })}`}>Next</Link>}
        </div>
      </section>
    </section>
  );
}
