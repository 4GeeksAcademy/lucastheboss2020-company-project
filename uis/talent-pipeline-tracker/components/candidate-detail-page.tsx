"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import {
  formatIsoDate,
  STAGE_LABELS,
  STAGE_OPTIONS,
  STATUS_LABELS,
  STATUS_OPTIONS,
} from "@/lib/labels";
import {
  createNote,
  deleteNote,
  getNotes,
  getRecord,
  patchRecord,
  updateRecord,
} from "@/lib/tracker-api";
import type { CandidateCreatePayload, CandidateNote, CandidateRecord } from "@/types/tracker";

const EMPTY_EDIT_FORM: CandidateCreatePayload = {
  full_name: "",
  email: "",
  phone: "",
  position: "",
  linkedin_url: "",
  cv_url: "",
  experience_years: 0,
};

interface CandidateDetailPageProps {
  candidateId: string;
}

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

export default function CandidateDetailPage({ candidateId }: CandidateDetailPageProps) {
  const [record, setRecord] = useState<CandidateRecord | null>(null);
  const [notes, setNotes] = useState<CandidateNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [statusDraft, setStatusDraft] = useState<(typeof STATUS_OPTIONS)[number]>("received");
  const [stageDraft, setStageDraft] = useState<(typeof STAGE_OPTIONS)[number]>("pending");

  const [statusState, setStatusState] = useState<{
    loading: boolean;
    error: string | null;
    message: string | null;
  }>({
    loading: false,
    error: null,
    message: null,
  });

  const [editForm, setEditForm] = useState<CandidateCreatePayload>(EMPTY_EDIT_FORM);
  const [editState, setEditState] = useState<{
    loading: boolean;
    message: string | null;
    error: string | null;
  }>({
    loading: false,
    message: null,
    error: null,
  });

  const [noteContent, setNoteContent] = useState("");
  const [noteState, setNoteState] = useState<{
    loading: boolean;
    message: string | null;
    error: string | null;
  }>({
    loading: false,
    message: null,
    error: null,
  });
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [candidate, candidateNotes] = await Promise.all([
          getRecord(candidateId),
          getNotes(candidateId),
        ]);

        setRecord(candidate);
        setNotes(candidateNotes);
        setStatusDraft(candidate.status);
        setStageDraft(candidate.stage);
        setEditForm({
          full_name: candidate.full_name,
          email: candidate.email,
          phone: candidate.phone,
          position: candidate.position,
          linkedin_url: candidate.linkedin_url,
          cv_url: candidate.cv_url,
          experience_years: candidate.experience_years,
        });
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "Unable to load candidate detail.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, [candidateId]);

  async function refreshNotes() {
    const refreshed = await getNotes(candidateId);
    setNotes(refreshed);
  }

  async function handleStatusUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatusState({ loading: true, error: null, message: null });

    try {
      const updated = await patchRecord(candidateId, {
        status: statusDraft,
        stage: stageDraft,
      });
      setRecord(updated);
    } catch (patchError) {
      const message =
        patchError instanceof Error
          ? patchError.message
          : "Unable to update status and stage.";
      setStatusState({ loading: false, error: message, message: null });
      return;
    }

    setStatusState({
      loading: false,
      error: null,
      message: "Updated candidate status and stage successfully.",
    });
  }

  async function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = normalizeCandidatePayload(editForm);

    if (
      !payload.full_name ||
      !payload.email ||
      !payload.phone ||
      !payload.position ||
      Number.isNaN(payload.experience_years) ||
      payload.experience_years < 0
    ) {
      setEditState({
        loading: false,
        message: null,
        error:
          "Full name, email, phone, position, and non-negative years of experience are required.",
      });
      return;
    }

    setEditState({ loading: true, message: null, error: null });

    try {
      const updated = await updateRecord(candidateId, payload);

      setRecord(updated);
      setStatusDraft(updated.status);
      setStageDraft(updated.stage);
      setEditState({
        loading: false,
        message: "Candidate details updated.",
        error: null,
      });
    } catch (updateError) {
      const message =
        updateError instanceof Error
          ? updateError.message
          : "Unable to update candidate.";
      setEditState({ loading: false, message: null, error: message });
    }
  }

  async function handleNoteCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!noteContent.trim()) {
      setNoteState({
        loading: false,
        message: null,
        error: "Note content is required.",
      });
      return;
    }

    setNoteState({ loading: true, message: null, error: null });

    try {
      await createNote(candidateId, noteContent.trim());
      setNoteContent("");
      await refreshNotes();
      setNoteState({
        loading: false,
        message: "Note added.",
        error: null,
      });
    } catch (createError) {
      const message =
        createError instanceof Error ? createError.message : "Unable to add note.";
      setNoteState({ loading: false, message: null, error: message });
    }
  }

  async function handleDeleteNote(noteId: string) {
    setDeletingNoteId(noteId);
    setNoteState({ loading: false, message: null, error: null });

    try {
      await deleteNote(candidateId, noteId);
      await refreshNotes();
      setNoteState({
        message: "Note deleted.",
        loading: false,
        error: null,
      });
    } catch (deleteError) {
      const message =
        deleteError instanceof Error ? deleteError.message : "Unable to delete note.";
      setNoteState({ loading: false, message: null, error: message });
    } finally {
      setDeletingNoteId(null);
    }
  }

  if (loading) {
    return (
      <div className="tracker-shell">
        <p>Loading candidate profile...</p>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="tracker-shell">
        <p className="error">{error ?? "Candidate not found."}</p>
        <Link href="/" className="link-button">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="tracker-shell">
      <header className="tracker-header">
        <div>
          <p className="eyebrow">TrackFlow · Candidate detail</p>
          <h1>{record.full_name}</h1>
          <p className="subtle">
            Applied for {record.position} · Last update {formatIsoDate(record.updated_at)}
          </p>
          <p className="success">Candidate loaded.</p>
        </div>
        <Link href="/" className="link-button">
          Back to list
        </Link>
      </header>

      <section className="tracker-panel">
        <h2>Candidate profile</h2>
        <dl className="detail-grid">
          <div>
            <dt>Email</dt>
            <dd>{record.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{record.phone}</dd>
          </div>
          <div>
            <dt>Position</dt>
            <dd>{record.position}</dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              {record.linkedin_url ? (
                <a href={record.linkedin_url} target="_blank" rel="noreferrer">
                  Open profile
                </a>
              ) : (
                "Not provided"
              )}
            </dd>
          </div>
          <div>
            <dt>CV link</dt>
            <dd>
              {record.cv_url ? (
                <a href={record.cv_url} target="_blank" rel="noreferrer">
                  Open CV
                </a>
              ) : (
                "Not provided"
              )}
            </dd>
          </div>
          <div>
            <dt>Years of experience</dt>
            <dd>{record.experience_years}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{STATUS_LABELS[record.status]}</dd>
          </div>
          <div>
            <dt>Stage</dt>
            <dd>{STAGE_LABELS[record.stage]}</dd>
          </div>
          <div>
            <dt>Application date</dt>
            <dd>{formatIsoDate(record.applied_at)}</dd>
          </div>
        </dl>
      </section>

      <section className="tracker-panel">
        <h2>Update status and stage</h2>
        <form className="form-grid" onSubmit={handleStatusUpdate}>
          <label>
            Status
            <select
              value={statusDraft}
              onChange={(event) =>
                setStatusDraft(event.target.value as (typeof STATUS_OPTIONS)[number])
              }
            >
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
              value={stageDraft}
              onChange={(event) =>
                setStageDraft(event.target.value as (typeof STAGE_OPTIONS)[number])
              }
            >
              {STAGE_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {STAGE_LABELS[value]}
                </option>
              ))}
            </select>
          </label>

          <div className="form-actions">
            <button type="submit" disabled={statusState.loading}>
              {statusState.loading ? "Updating..." : "Apply changes"}
            </button>
          </div>
        </form>

        {statusState.error ? <p className="error">{statusState.error}</p> : null}
        {statusState.message ? <p className="success">{statusState.message}</p> : null}
      </section>

      <section className="tracker-panel">
        <h2>Edit candidate details</h2>
        <form className="form-grid" onSubmit={handleEditSubmit}>
          <label>
            Full name *
            <input
              value={editForm.full_name}
              onChange={(event) =>
                setEditForm((prev) => ({ ...prev, full_name: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Email *
            <input
              type="email"
              value={editForm.email}
              onChange={(event) =>
                setEditForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Phone *
            <input
              value={editForm.phone}
              onChange={(event) =>
                setEditForm((prev) => ({ ...prev, phone: event.target.value }))
              }
              required
            />
          </label>

          <label>
            Position *
            <input
              value={editForm.position}
              onChange={(event) =>
                setEditForm((prev) => ({ ...prev, position: event.target.value }))
              }
              required
            />
          </label>

          <label>
            LinkedIn URL
            <input
              type="url"
              value={editForm.linkedin_url}
              onChange={(event) =>
                setEditForm((prev) => ({ ...prev, linkedin_url: event.target.value }))
              }
            />
          </label>

          <label>
            CV URL
            <input
              type="url"
              value={editForm.cv_url}
              onChange={(event) =>
                setEditForm((prev) => ({ ...prev, cv_url: event.target.value }))
              }
            />
          </label>

          <label>
            Years of experience *
            <input
              type="number"
              min={0}
              value={editForm.experience_years}
              onChange={(event) =>
                setEditForm((prev) => ({
                  ...prev,
                  experience_years: Number(event.target.value),
                }))
              }
              required
            />
          </label>

          <div className="form-actions">
            <button type="submit" disabled={editState.loading}>
              {editState.loading ? "Saving..." : "Save candidate"}
            </button>
          </div>
        </form>

        {editState.message ? <p className="success">{editState.message}</p> : null}
        {editState.error ? <p className="error">{editState.error}</p> : null}
      </section>

      <section className="tracker-panel">
        <h2>Interview notes</h2>
        <form className="form-grid" onSubmit={handleNoteCreate}>
          <label>
            New note
            <textarea
              value={noteContent}
              onChange={(event) => setNoteContent(event.target.value)}
              rows={4}
              placeholder="Add call feedback, follow-up tasks, or interview insights"
            />
          </label>

          <div className="form-actions">
            <button type="submit" disabled={noteState.loading}>
              {noteState.loading ? "Saving..." : "Add note"}
            </button>
          </div>
        </form>

        {noteState.message ? <p className="success">{noteState.message}</p> : null}
        {noteState.error ? <p className="error">{noteState.error}</p> : null}

        {notes.length === 0 ? (
          <p className="subtle">No TrackFlow notes added for this candidate yet.</p>
        ) : (
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.id}>
                <div>
                  <p>{note.content}</p>
                  <small>{formatIsoDate(note.created_at)}</small>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    void handleDeleteNote(note.id);
                  }}
                  disabled={deletingNoteId === note.id}
                >
                  {deletingNoteId === note.id ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
