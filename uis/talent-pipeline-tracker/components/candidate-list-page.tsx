"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import {
  STATUS_LABELS,
  STATUS_OPTIONS,
  STAGE_LABELS,
  STAGE_OPTIONS,
} from "@/lib/labels";
import { createRecord, getRecords } from "@/lib/tracker-api";
import type {
  CandidateCreatePayload,
  CandidateFilters,
  CandidateRecord,
} from "@/types/tracker";

const EMPTY_CREATE_FORM: CandidateCreatePayload = {
  full_name: "",
  email: "",
  phone: "",
  position: "",
  linkedin_url: "",
  cv_url: "",
  experience_years: 0,
};

function normalizeCandidatePayload(
  value: CandidateCreatePayload,
): CandidateCreatePayload {
  const linkedin = value.linkedin_url?.trim();
  const cv = value.cv_url?.trim();

  return {
    full_name: value.full_name.trim(),
    email: value.email.trim(),
    phone: value.phone.trim(),
    position: value.position.trim(),
    experience_years: Number(value.experience_years),
    ...(linkedin ? { linkedin_url: linkedin } : {}),
    ...(cv ? { cv_url: cv } : {}),
  };
}

function toFilters(searchParams: URLSearchParams): CandidateFilters {
  const statusValue = searchParams.get("status") ?? "all";
  const stageValue = searchParams.get("stage") ?? "all";
  const queryValue = searchParams.get("q") ?? "";

  const status = STATUS_OPTIONS.includes(statusValue as (typeof STATUS_OPTIONS)[number])
    ? (statusValue as CandidateFilters["status"])
    : "all";

  const stage = STAGE_OPTIONS.includes(stageValue as (typeof STAGE_OPTIONS)[number])
    ? (stageValue as CandidateFilters["stage"])
    : "all";

  return {
    status,
    stage,
    q: queryValue,
  };
}

export default function CandidateListPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [records, setRecords] = useState<CandidateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const [createForm, setCreateForm] =
    useState<CandidateCreatePayload>(EMPTY_CREATE_FORM);
  const [createState, setCreateState] = useState<{
    loading: boolean;
    message: string | null;
    error: string | null;
  }>({
    loading: false,
    message: null,
    error: null,
  });

  useEffect(() => {
    async function loadRecords() {
      setLoading(true);
      setError(null);

      try {
        const data = await getRecords();
        setRecords(data);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "Unable to load candidates.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void loadRecords();
  }, [refreshToken]);

  const filters = useMemo(
    () => toFilters(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const statusMatch =
        filters.status === "all" ? true : record.status === filters.status;

      const stageMatch =
        filters.stage === "all" ? true : record.stage === filters.stage;

      const q = filters.q.trim().toLowerCase();
      const searchMatch =
        q.length === 0
          ? true
          : record.full_name.toLowerCase().includes(q) ||
            record.email.toLowerCase().includes(q);

      return statusMatch && stageMatch && searchMatch;
    });
  }, [filters, records]);

  function updateQuery(nextValues: Partial<CandidateFilters>) {
    const params = new URLSearchParams(searchParams.toString());
    const next = { ...filters, ...nextValues };

    if (next.status === "all") {
      params.delete("status");
    } else {
      params.set("status", next.status);
    }

    if (next.stage === "all") {
      params.delete("stage");
    } else {
      params.set("stage", next.stage);
    }

    if (next.q.trim().length === 0) {
      params.delete("q");
    } else {
      params.set("q", next.q.trim());
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }

  async function handleCreateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = normalizeCandidatePayload(createForm);

    if (
      !payload.full_name.trim() ||
      !payload.email.trim() ||
      !payload.phone.trim() ||
      !payload.position.trim() ||
      Number.isNaN(payload.experience_years) ||
      payload.experience_years < 0
    ) {
      setCreateState({
        loading: false,
        message: null,
        error:
          "Full name, email, phone, position, and non-negative years of experience are required.",
      });
      return;
    }

    setCreateState({ loading: true, message: null, error: null });

    try {
      await createRecord(payload);
      setCreateForm(EMPTY_CREATE_FORM);
      setRefreshToken((value) => value + 1);
      setCreateState({
        loading: false,
        message: "Candidate created.",
        error: null,
      });
    } catch (createError) {
      const message =
        createError instanceof Error
          ? createError.message
          : "Unable to create candidate.";

      setCreateState({ loading: false, message: null, error: message });
    }
  }

  return (
    <div className="tracker-shell">
      <header className="tracker-header">
        <div>
          <p className="eyebrow">TrackFlow · Executive Assistant search</p>
          <h1>Candidate management tracker</h1>
          <p className="subtle">
            Internal hiring panel for Zaragoza headquarters. Review records, keep
            the process moving, and avoid spreadsheet drift.
          </p>
        </div>
      </header>

      <section className="tracker-panel">
        <h2>Candidate list</h2>
        <p className="subtle">Filter by status and stage, or search by name/email.</p>

        <div className="toolbar-grid">
          <label>
            Status
            <select
              value={filters.status}
              onChange={(event) =>
                updateQuery({
                  status: event.target.value as CandidateFilters["status"],
                })
              }
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {STATUS_LABELS[value]}
                </option>
              ))}
            </select>
          </label>

          <label>
            Stage
            <select
              value={filters.stage}
              onChange={(event) =>
                updateQuery({ stage: event.target.value as CandidateFilters["stage"] })
              }
            >
              <option value="all">All stages</option>
              {STAGE_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {STAGE_LABELS[value]}
                </option>
              ))}
            </select>
          </label>

          <label>
            Search
            <input
              type="search"
              value={filters.q}
              onChange={(event) => updateQuery({ q: event.target.value })}
              placeholder="Name or email"
            />
          </label>
        </div>

        {loading ? <p>Loading your TrackFlow pipeline...</p> : null}
        {error ? <p className="error">{error}</p> : null}
        {!loading && !error ? (
          <p className="success">
            Showing {filteredRecords.length} {filteredRecords.length === 1 ? "candidate" : "candidates"}.
          </p>
        ) : null}

        {!loading && !error && records.length === 0 ? (
          <p>No candidates in the pipeline yet.</p>
        ) : null}

        {!loading && !error && records.length > 0 && filteredRecords.length === 0 ? (
          <p>No candidates match these filters.</p>
        ) : null}

        {!loading && !error && filteredRecords.length > 0 ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Stage</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.full_name}</td>
                    <td>{record.position}</td>
                    <td>{STATUS_LABELS[record.status]}</td>
                    <td>{STAGE_LABELS[record.stage]}</td>
                    <td>{record.email}</td>
                    <td>
                      <Link href={`/candidates/${record.id}`} className="link-button">
                        View profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      <section className="tracker-panel">
        <h2>Register new candidate</h2>
        <p className="subtle">Required API fields are enforced before submit.</p>

        <form className="form-grid" onSubmit={handleCreateSubmit}>
          <label>
            Full name *
            <input
              value={createForm.full_name}
              onChange={(event) =>
                setCreateForm((prev) => ({ ...prev, full_name: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Email *
            <input
              type="email"
              value={createForm.email}
              onChange={(event) =>
                setCreateForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Phone *
            <input
              value={createForm.phone}
              onChange={(event) =>
                setCreateForm((prev) => ({ ...prev, phone: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Position *
            <input
              value={createForm.position}
              onChange={(event) =>
                setCreateForm((prev) => ({ ...prev, position: event.target.value }))
              }
              required
            />
          </label>

          <label>
            LinkedIn URL
            <input
              type="url"
              value={createForm.linkedin_url}
              onChange={(event) =>
                setCreateForm((prev) => ({ ...prev, linkedin_url: event.target.value }))
              }
            />
          </label>

          <label>
            CV URL
            <input
              type="url"
              value={createForm.cv_url}
              onChange={(event) =>
                setCreateForm((prev) => ({ ...prev, cv_url: event.target.value }))
              }
            />
          </label>

          <label>
            Years of experience *
            <input
              type="number"
              min={0}
              value={createForm.experience_years}
              onChange={(event) =>
                setCreateForm((prev) => ({
                  ...prev,
                  experience_years: Number(event.target.value),
                }))
              }
              required
            />
          </label>

          <div className="form-actions">
            <button type="submit" disabled={createState.loading}>
              {createState.loading ? "Saving..." : "Register candidate"}
            </button>
          </div>
        </form>

        {createState.message ? <p className="success">{createState.message}</p> : null}
        {createState.error ? <p className="error">{createState.error}</p> : null}
      </section>
    </div>
  );
}
