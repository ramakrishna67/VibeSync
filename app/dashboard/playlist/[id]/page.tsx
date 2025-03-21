// app/dashboard/playlist/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Track {
  id: string;
  name: string;
  artist: string;
  coverUrl: string;
}

export default function PlaylistPage() {
  const { id } = useParams(); // Get the playlist ID from the URL
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlistName, setPlaylistName] = useState<string>("");

  // Fetch all tracks in the playlist
  const fetchAllTracks = async (url: string, accessToken: string) => {
    let allTracks: Track[] = [];

    while (url) {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tracks");
      }

      const data = await response.json();
      const playlistTracks = data.items.map((item: any) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists.map((artist: any) => artist.name).join(", "),
        coverUrl: item.track.album.images[0]?.url || "/placeholder.svg",
      }));

      allTracks = [...allTracks, ...playlistTracks];
      url = data.next; // Update the URL to fetch the next page of tracks
    }

    return allTracks;
  };

  // Fetch the playlist details and tracks
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        // Retrieve the access token from the /api/token endpoint
        const tokenResponse = await fetch("/api/token");
        const { access_token } = await tokenResponse.json();

        if (!access_token) {
          throw new Error("No access token found");
        }

        // Fetch the playlist details
        const playlistResponse = await fetch(
          `https://api.spotify.com/v1/playlists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (!playlistResponse.ok) {
          throw new Error("Failed to fetch playlist");
        }

        const playlistData = await playlistResponse.json();
        setPlaylistName(playlistData.name);

        // Fetch all tracks in the playlist
        const initialUrl = `https://api.spotify.com/v1/playlists/${id}/tracks?limit=50`;
        const allTracks = await fetchAllTracks(initialUrl, access_token);
        setTracks(allTracks);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };

    fetchPlaylistData();
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{playlistName}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {tracks.map((track) => (
          <Card key={track.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={track.coverUrl}
                alt={track.name}
                fill
                className="object-cover transition-all hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium line-clamp-1">{track.name}</h4>
              <p className="text-xs text-muted-foreground">{track.artist}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
