import { NextRequest, NextResponse } from "next/server";
import { deleteNote } from "../../../data";
import { requireAuthentication } from "../../../../_auth";

interface RouteContext {
  params: { id: string; noteId: string };
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const authError = requireAuthentication(request);
  if (authError) return authError;

  const result = deleteNote(params.id, params.noteId);

  if (!result.candidate) {
    return NextResponse.json({ error: result.errors?.join(" ") ?? "Note could not be deleted." }, { status: 400 });
  }

  return NextResponse.json(result.candidate);
}
