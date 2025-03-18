"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Search, Play } from "lucide-react";
import Image from "next/image";

export function MoodSearch() {
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState([50]);
  const [tempo, setTempo] = useState([120]);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    setIsSearching(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSearching(false);
      setResults(mockResults);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Mood-Based Search</h2>
        <p className="text-muted-foreground">
          Find music that matches your current mood and vibe using AI
        </p>
      </div>

      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="mood" className="text-sm font-medium">
                How are you feeling today?
              </label>
              <div className="flex gap-2">
                <Input
                  id="mood"
                  placeholder="e.g., happy, relaxed, energetic, melancholic..."
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="energy" className="text-sm font-medium">
                Energy Level: {energy}%
              </label>
              <Slider
                id="energy"
                value={energy}
                max={100}
                step={1}
                onValueChange={setEnergy}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Calm</span>
                <span>Energetic</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="tempo" className="text-sm font-medium">
                Tempo: {tempo} BPM
              </label>
              <Slider
                id="tempo"
                value={tempo}
                min={60}
                max={180}
                step={1}
                onValueChange={setTempo}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleSearch}
              disabled={isSearching || !mood.trim()}
            >
              {isSearching ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Music
                </>
              )}
            </Button>
          </div>

          <div className="hidden md:block">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Sparkles className="mx-auto h-12 w-12 text-primary opacity-50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Our AI analyzes your mood and preferences to find the perfect
                  music for your current state of mind
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Results for "{mood}" mood</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((track, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="flex gap-4 p-4">
                  <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden relative">
                    <Image
                      src={track.coverUrl || "/placeholder.svg"}
                      alt={track.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-medium">{track.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {track.artist}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {track.mood}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {track.bpm} BPM
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const mockResults = [
  {
    title: "Happy Together",
    artist: "The Turtles",
    coverUrl: "/placeholder.svg?height=64&width=64",
    mood: "Happy",
    bpm: 120,
  },
  {
    title: "Good Vibrations",
    artist: "The Beach Boys",
    coverUrl: "/placeholder.svg?height=64&width=64",
    mood: "Upbeat",
    bpm: 125,
  },
  {
    title: "Walking on Sunshine",
    artist: "Katrina & The Waves",
    coverUrl: "/placeholder.svg?height=64&width=64",
    mood: "Energetic",
    bpm: 132,
  },
  {
    title: "Don't Worry Be Happy",
    artist: "Bobby McFerrin",
    coverUrl: "/placeholder.svg?height=64&width=64",
    mood: "Cheerful",
    bpm: 115,
  },
  {
    title: "Here Comes the Sun",
    artist: "The Beatles",
    coverUrl: "/placeholder.svg?height=64&width=64",
    mood: "Optimistic",
    bpm: 118,
  },
  {
    title: "I'm a Believer",
    artist: "The Monkees",
    coverUrl: "/placeholder.svg?height=64&width=64",
    mood: "Joyful",
    bpm: 122,
  },
];
