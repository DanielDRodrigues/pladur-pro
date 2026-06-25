import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "node:crypto";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  picture?: string;
};

type SessionPayload = {
  user: AuthUser;
  expiresAt: string;
};

export const SESSION_COOKIE = "pladur_session";
export const OAUTH_STATE_COOKIE = "pladur_oauth_state";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function sign(value: string) {
  return crypto
    .createHmac("sha256", getRequiredEnv("AUTH_SECRET"))
    .update(value)
    .digest("base64url");
}

function verifySignature(value: string, signature: string) {
  const expected = sign(value);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  return (
    expectedBuffer.length === signatureBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
  );
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(value: string) {
  return JSON.parse(Buffer.from(value, "base64url").toString()) as SessionPayload;
}

export function getGoogleClientId() {
  return getRequiredEnv("GOOGLE_CLIENT_ID");
}

export function getGoogleClientSecret() {
  return getRequiredEnv("GOOGLE_CLIENT_SECRET");
}

export function createOAuthState() {
  return crypto.randomBytes(32).toString("base64url");
}

export function createSessionValue(user: AuthUser) {
  const payload = encodePayload({
    user,
    expiresAt: new Date(Date.now() + SESSION_DURATION_MS).toISOString(),
  });

  return `${payload}.${sign(payload)}`;
}

export function readSessionValue(value: string | undefined) {
  if (!value) {
    return null;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature || !verifySignature(payload, signature)) {
    return null;
  }

  const session = decodePayload(payload);

  if (new Date(session.expiresAt).getTime() <= Date.now()) {
    return null;
  }

  return session;
}

export async function getSession() {
  const cookieStore = await cookies();
  return readSessionValue(cookieStore.get(SESSION_COOKIE)?.value);
}

export function setSessionCookie(response: NextResponse, user: AuthUser) {
  response.cookies.set(SESSION_COOKIE, createSessionValue(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.delete(SESSION_COOKIE);
}

export function setOAuthStateCookie(response: NextResponse, state: string) {
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });
}

export function clearOAuthStateCookie(response: NextResponse) {
  response.cookies.delete(OAUTH_STATE_COOKIE);
}
