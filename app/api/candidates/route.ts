import { NextRequest, NextResponse } from "next/server";
import { createCandidate, listCandidates } from "./data";
import type { CandidateWriteInput } from "../../../src/candidates/types";
import { hasValidBearerToken, unauthorized } from "../_auth";

export async function GET(request: NextRequest) {
  if (!hasValidBearerToken(request)) {
    return unauthorized();
  }
  const url = new URL(request.url);
  return NextResponse.json(listCandidates(url.searchParams));
}

export async function POST(request: NextRequest) {
  // Lead capture is public — no auth required
  try {
    const body = (await request.json()) as CandidateWriteInput;
    const result = createCandidate(body);

    if (!result.candidate) {
      return NextResponse.json({ error: result.errors?.join(" ") ?? "Candidate could not be created." }, { status: 400 });
    }

    return NextResponse.json(result.candidate, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Candidate request payload is invalid." }, { status: 400 });
  }
}
