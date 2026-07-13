import type {
  CandidateCreatePayload,
  CandidateNote,
  CandidatePatchPayload,
  CandidateRecord,
} from "@/types/tracker";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_TRACKER_API_URL ??
  "https://playground.4geeks.com/tracker/api/v1";

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total: number;
  limit: number;
}

function asArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (value && typeof value === "object" && "data" in value) {
    const withData = value as PaginatedResponse<T>;
    if (Array.isArray(withData.data)) {
      return withData.data;
    }
  }

  return [];
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let details = "Unexpected API error";
    try {
      const errPayload = (await response.json()) as { detail?: string };
      details = errPayload.detail ?? details;
    } catch {
      details = response.statusText || details;
    }

    throw new Error(details);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function getRecords(): Promise<CandidateRecord[]> {
  const payload = await request<PaginatedResponse<CandidateRecord> | CandidateRecord[]>(
    "/records?limit=100&page=1",
  );

  return asArray<CandidateRecord>(payload);
}

export async function getRecord(id: string): Promise<CandidateRecord> {
  return request<CandidateRecord>(`/records/${id}`);
}

export async function createRecord(
  payload: CandidateCreatePayload,
): Promise<CandidateRecord> {
  return request<CandidateRecord>("/records", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateRecord(
  id: string,
  payload: CandidateCreatePayload,
): Promise<CandidateRecord> {
  return request<CandidateRecord>(`/records/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function patchRecord(
  id: string,
  payload: CandidatePatchPayload,
): Promise<CandidateRecord> {
  return request<CandidateRecord>(`/records/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function getNotes(recordId: string): Promise<CandidateNote[]> {
  const payload = await request<CandidateNote[] | PaginatedResponse<CandidateNote>>(
    `/records/${recordId}/notes`,
  );

  return asArray<CandidateNote>(payload);
}

export async function createNote(recordId: string, content: string): Promise<void> {
  await request<void>(`/records/${recordId}/notes`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function deleteNote(recordId: string, noteId: string): Promise<void> {
  await request<void>(`/records/${recordId}/notes/${noteId}`, {
    method: "DELETE",
  });
}
