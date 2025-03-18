// This is a mock implementation of the Spotify API client
// In a real application, you would use the actual Spotify Web API

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: {
    total: number;
  };
}

class SpotifyApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  async getProfile(): Promise<SpotifyUser> {
    // Mock implementation
    return {
      id: "user123",
      display_name: "John Doe",
      email: "john.doe@example.com",
      images: [{ url: "/placeholder.svg?height=200&width=200" }],
    };
  }

  async getRecentlyPlayed(): Promise<SpotifyTrack[]> {
    // Mock implementation
    return Array(5)
      .fill(null)
      .map((_, i) => ({
        id: `track${i}`,
        name: `Track ${i + 1}`,
        artists: [{ name: `Artist ${i + 1}` }],
        album: {
          name: `Album ${i + 1}`,
          images: [{ url: `/placeholder.svg?height=200&width=200` }],
        },
        duration_ms: 180000 + i * 10000,
      }));
  }

  async getPlaylists(): Promise<SpotifyPlaylist[]> {
    // Mock implementation
    return Array(3)
      .fill(null)
      .map((_, i) => ({
        id: `playlist${i}`,
        name: `Playlist ${i + 1}`,
        description: `Description for playlist ${i + 1}`,
        images: [{ url: `/placeholder.svg?height=64&width=64` }],
        tracks: {
          total: 20 + i * 5,
        },
      }));
  }

  async searchTracks(query: string): Promise<SpotifyTrack[]> {
    // Mock implementation
    return Array(10)
      .fill(null)
      .map((_, i) => ({
        id: `search${i}`,
        name: `${query} Result ${i + 1}`,
        artists: [{ name: `Search Artist ${i + 1}` }],
        album: {
          name: `Search Album ${i + 1}`,
          images: [{ url: `/placeholder.svg?height=200&width=200` }],
        },
        duration_ms: 180000 + i * 10000,
      }));
  }

  async getMoodBasedRecommendations(
    mood: string,
    energy: number,
    tempo: number
  ): Promise<SpotifyTrack[]> {
    // Mock implementation
    // In a real app, this would use Spotify's recommendation API with appropriate parameters
    return Array(6)
      .fill(null)
      .map((_, i) => ({
        id: `mood${i}`,
        name: `${mood} Song ${i + 1}`,
        artists: [{ name: `Mood Artist ${i + 1}` }],
        album: {
          name: `Mood Album ${i + 1}`,
          images: [{ url: `/placeholder.svg?height=200&width=200` }],
        },
        duration_ms: 180000 + i * 10000,
      }));
  }
}

// Export a singleton instance
export const spotifyApi = new SpotifyApiClient();
