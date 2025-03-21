import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code"); // Get auth code from URL
  const codeVerifier = req.cookies.get("spotify_code_verifier")?.value; // Retrieve stored verifier

  if (!code || !codeVerifier) {
    return NextResponse.json(
      { error: "Invalid authorization request" },
      { status: 400 }
    );
  }

  // Exchange authorization code for an access token
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      code_verifier: codeVerifier,
    }),
  });

  const data = await tokenResponse.json();

  if (!data.access_token) {
    return NextResponse.json(
      { error: "Failed to retrieve access token" },
      { status: 400 }
    );
  }

  // Store the access token in cookies or a session for authenticated API requests
  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
  );

  response.cookies.set("spotify_access_token", data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 3600,
  });

  // console.log("The access token is:>>>>>>>>>>>>>>>>>>>>>", data.access_token);

  response.cookies.set(
    "spotify_refresh_token",
    data.refresh_token || req.cookies.get("spotify_refresh_token")?.value || "",
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    }
  );

  return response;
}
