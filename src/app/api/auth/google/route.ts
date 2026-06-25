import { NextRequest, NextResponse } from "next/server";
import {
  createOAuthState,
  getGoogleClientId,
  setOAuthStateCookie,
} from "@/lib/auth";

export async function GET(request: NextRequest) {
  const state = createOAuthState();
  const redirectUri = new URL("/api/auth/google/callback", request.url);
  const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  let clientId: string;

  try {
    clientId = getGoogleClientId();
  } catch {
    return NextResponse.redirect(
      new URL("/?auth_error=auth_config_missing", request.url),
    );
  }

  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri.toString());
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("scope", "openid email profile");
  authorizationUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizationUrl);
  setOAuthStateCookie(response, state);

  return response;
}
