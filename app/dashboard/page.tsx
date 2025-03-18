"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Home,
  Library,
  Clock,
  Heart,
  Music,
  Mic,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MusicPlayer } from "@/components/musicPlayer";
import { MoodSearch } from "@/components/moodSearch";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Vibez</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search songs, artists, albums..."
                className="w-full rounded-full bg-muted pl-8 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-[240px] flex-col border-r bg-muted/40 sm:flex">
          <div className="flex h-14 items-center border-b px-4">
            <h2 className="text-lg font-semibold">Menu</h2>
          </div>
          <nav className="grid gap-2 px-2 py-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground bg-muted"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/dashboard/library"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Library className="h-4 w-4" />
              Your Library
            </Link>
            <Link
              href="/dashboard/recent"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Clock className="h-4 w-4" />
              Recently Played
            </Link>
            <Link
              href="/dashboard/liked"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Heart className="h-4 w-4" />
              Liked Songs
            </Link>
            <div className="my-2 border-t" />
            <h3 className="mb-2 px-4 text-xs font-semibold">AI FEATURES</h3>
            <Link
              href="/dashboard/mood"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Sparkles className="h-4 w-4" />
              Mood Search
            </Link>
            <Link
              href="/dashboard/voice"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Mic className="h-4 w-4" />
              Voice Commands
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <Tabs defaultValue="home">
              <TabsList className="mb-4">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="mood">Mood Search</TabsTrigger>
              </TabsList>
              <TabsContent value="home" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Welcome back, John!
                  </h2>
                  <p className="text-muted-foreground">
                    Here's what's trending and recommended for you today.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recently Played</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {recentlyPlayed.map((item, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-square relative">
                          <Image
                            src={item.coverUrl || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-all hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {item.artist}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Made For You</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {madeForYou.map((playlist, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="flex gap-4 p-4">
                          <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={playlist.coverUrl || "/placeholder.svg"}
                              alt={playlist.title}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="font-medium">{playlist.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {playlist.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="discover" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Discover New Music
                  </h2>
                  <p className="text-muted-foreground">
                    Explore new releases and recommendations based on your
                    taste.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">New Releases</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {newReleases.map((item, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-square relative">
                          <Image
                            src={item.coverUrl || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-all hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {item.artist}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="mood" className="space-y-6">
                <MoodSearch />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MusicPlayer />
    </div>
  );
}

const recentlyPlayed = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "As It Was",
    artist: "Harry Styles",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Heat Waves",
    artist: "Glass Animals",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "Bad Habits",
    artist: "Ed Sheeran",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
];

const madeForYou = [
  {
    title: "Daily Mix 1",
    description: "The Weeknd, Dua Lipa, Post Malone and more",
    coverUrl: "/placeholder.svg?height=64&width=64",
  },
  {
    title: "Discover Weekly",
    description: "Your weekly mixtape of fresh music",
    coverUrl: "/placeholder.svg?height=64&width=64",
  },
  {
    title: "Release Radar",
    description: "Catch all the latest music from artists you follow",
    coverUrl: "/placeholder.svg?height=64&width=64",
  },
];

const newReleases = [
  {
    title: "New Album Title 1",
    artist: "Popular Artist 1",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "New Album Title 2",
    artist: "Popular Artist 2",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "New Album Title 3",
    artist: "Popular Artist 3",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "New Album Title 4",
    artist: "Popular Artist 4",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
  {
    title: "New Album Title 5",
    artist: "Popular Artist 5",
    coverUrl: "/placeholder.svg?height=200&width=200",
  },
];
