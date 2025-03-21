import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("spotify_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  const userProfile = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userData = await userProfile.json();
  return NextResponse.json(userData);
}
