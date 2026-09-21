import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

function base64UrlDecode(input: string): string {
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}

function parseToken(token: string): { header: unknown; payload: unknown; signature: string } | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    return {
      header: JSON.parse(base64UrlDecode(parts[0])),
      payload: JSON.parse(base64UrlDecode(parts[1])),
      signature: parts[2],
    };
  } catch {
    return null;
  }
}

function verifyHs256(token: string, secret: string): unknown | null {
  const parsed = parseToken(token);
  if (!parsed) return null;

  const signature = createHmac("sha256", secret)
    .update(token.split(".").slice(0, 2).join("."))
    .digest("base64url");

  const sigBuf = Buffer.from(signature);
  const tokenSigBuf = Buffer.from(parsed.signature as string);

  if (sigBuf.length !== tokenSigBuf.length || !timingSafeEqual(sigBuf, tokenSigBuf)) {
    return null;
  }

  return parsed.payload;
}

export function hasValidBearerToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;

  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) return false;

  const payload = verifyHs256(authHeader.slice(7), secret);
  if (!payload) return false;

  const typedPayload = payload as { exp?: number };
  if (typedPayload.exp && Date.now() >= typedPayload.exp * 1000) return false;

  return true;
}

export function unauthorized(): Response {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export function requireAuthentication(request: NextRequest): Response | undefined {
  if (!hasValidBearerToken(request)) {
    return unauthorized();
  }
  return undefined;
}