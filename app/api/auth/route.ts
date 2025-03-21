import { NextResponse } from "next/server";
import { generateRandomString, generateCodeChallenge } from "@/lib/authHelper";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;

  // console.log(clientId);
  // console.log("redirect url: ", redirectUri);

  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Store the code verifier securely in cookies
  const response = NextResponse.redirect(
    `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=user-read-private user-read`
  );

  response.cookies.set("spotify_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 300,
  });

  return response;
}
