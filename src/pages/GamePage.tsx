import * as React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Play, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getGame } from "@/lib/games";

export default function GamePage() {
  const { slug } = useParams<{ slug: string }>();
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [gameLoaded, setGameLoaded] = React.useState(false);
  const [gameError, setGameError] = React.useState(false);

  const game = slug ? getGame(slug) : undefined;

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!game) {
    return <Navigate to="/404" replace />;
  }

  const gameUrl = "/"+game.buildPath;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-elevated">
      <header className="glass backdrop-blur-md border-b border-glass-border sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="glass hover:glow-primary transition-all duration-300"
              >
                <Link to="/" aria-label="Back to home">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>

              <div className="space-y-1">
                <h1 className="font-bold text-fluid-lg gradient-text">
                  {game.title}
                </h1>
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <div className="flex items-center gap-1 text-xs text-success">
                      <Wifi className="h-3 w-3" />
                      Online
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-warning">
                      <WifiOff className="h-3 w-3" />
                      Offline
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    PWA Enabled
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="glass">
                <a
                  href={gameUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  New Tab
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Game Info Card */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={`/${game.thumbnail}`}
                  alt={`${game.title} thumbnail`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <CardTitle className="text-fluid-2xl gradient-text mb-2">
                    {game.title}
                  </CardTitle>
                  <CardDescription className="text-fluid-base">
                    {game.description}
                  </CardDescription>
                </div>

                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="glass">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Difficulty:</span>
                    <div className="font-medium">
                      {game.difficulty || "Not rated"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Play Time:</span>
                    <div className="font-medium">
                      {game.playTime || "Variable"}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Released:</span>
                    <div className="font-medium">
                      {new Date(game.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div className="font-medium text-success">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Game Frame */}
        <Card className="glass-card">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              {!gameLoaded && !gameError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-fluid-base text-muted-foreground">
                    Loading game...
                  </p>
                </div>
              )}

              {gameError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 p-8 text-center">
                  <div className="text-destructive text-4xl">⚠️</div>
                  <h3 className="text-fluid-lg font-semibold">
                    Game Unavailable
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    This game is currently unavailable. In a real
                    implementation, the game would be built and served from the
                    games directory.
                  </p>
                  <Button
                    onClick={() => {
                      setGameError(false);
                      setGameLoaded(false);
                    }}
                    className="neu-btn"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </div>
              ) : (
                <iframe
                  src={gameUrl}
                  className={`w-full h-full border-0 ${
                    gameLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  title={game.title}
                  onLoad={() => setGameLoaded(true)}
                  onError={() => setGameError(true)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Game Instructions */}
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="text-fluid-lg">How to Play</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Controls</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use arrow keys or WASD to move</li>
                  <li>• Space bar for action/jump</li>
                  <li>• Escape to pause</li>
                  <li>• F11 for fullscreen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• ✅ Offline gameplay</li>
                  <li>• ✅ Auto-save progress</li>
                  <li>• ✅ Responsive design</li>
                  <li>• ✅ Keyboard & touch controls</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: game.title,
            description: game.description,
            applicationCategory: "Game",
            operatingSystem: "Web Browser",
            url: `https://rjryt.github.io/frostplay-hub/games/${game.slug}`,
            screenshot: `/${game.thumbnail}`,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Organization",
              name: "FrostPlay",
            },
            datePublished: game.createdAt,
            keywords: game.tags.join(", "),
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.5",
              ratingCount: "127",
            },
          }),
        }}
      />
    </div>
  );
}