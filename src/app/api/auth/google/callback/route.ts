import { NextRequest, NextResponse } from "next/server";
import {
  OAUTH_STATE_COOKIE,
  clearOAuthStateCookie,
  getGoogleClientId,
  getGoogleClientSecret,
  setSessionCookie,
  type AuthUser,
} from "@/lib/auth";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
};

type GoogleUserInfo = {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
};

function redirectWithError(request: NextRequest, error: string) {
  return NextResponse.redirect(new URL(`/?auth_error=${error}`, request.url));
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const error = requestUrl.searchParams.get("error");
  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  if (error) {
    const response = redirectWithError(request, "google_denied");
    clearOAuthStateCookie(response);
    return response;
  }

  if (!code || !state || !expectedState || state !== expectedState) {
    const response = redirectWithError(request, "invalid_state");
    clearOAuthStateCookie(response);
    return response;
  }

  let clientId: string;
  let clientSecret: string;

  try {
    clientId = getGoogleClientId();
    clientSecret = getGoogleClientSecret();
  } catch {
    const response = redirectWithError(request, "auth_config_missing");
    clearOAuthStateCookie(response);
    return response;
  }

  const redirectUri = new URL("/api/auth/google/callback", request.url);
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri.toString(),
      grant_type: "authorization_code",
    }),
  });

  const token = (await tokenResponse.json()) as GoogleTokenResponse;

  if (!tokenResponse.ok || !token.access_token) {
    const response = redirectWithError(request, "token_exchange_failed");
    clearOAuthStateCookie(response);
    return response;
  }

  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );

  const profile = (await userInfoResponse.json()) as GoogleUserInfo;

  if (!userInfoResponse.ok || !profile.sub || !profile.email) {
    const response = redirectWithError(request, "profile_failed");
    clearOAuthStateCookie(response);
    return response;
  }

  const user: AuthUser = {
    id: profile.sub,
    name: profile.name || profile.email,
    email: profile.email,
    picture: profile.picture,
  };

  const response = NextResponse.redirect(new URL("/", request.url));
  try {
    setSessionCookie(response, user);
  } catch {
    return redirectWithError(request, "auth_config_missing");
  }
  clearOAuthStateCookie(response);

  return response;
}
