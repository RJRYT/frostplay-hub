import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, Play, Star } from "lucide-react";
import { Game } from "@/lib/games";
import { Link } from "react-router-dom";

interface GameCardProps {
  game: Game;
  className?: string;
  style?: React.CSSProperties;
}

export function GameCard({ game, className, style }: GameCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <Card className={`game-card glass-card hover:glow-primary transition-all duration-300 group ${className}`} style={style}>
      <CardHeader className="relative overflow-hidden">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
          {!imageLoaded && !imageError && (
            <div className="skeleton absolute inset-0" aria-busy="true" aria-label="Loading thumbnail" />
          )}
          
          {!imageError ? (
            <img
              src={game.thumbnail}
              alt={`${game.title} thumbnail`}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">{game.title}</span>
            </div>
          )}
          
          {game.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="glass flex items-center gap-1">
                <Star className="h-3 w-3" />
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <CardTitle className="text-fluid-lg gradient-text">{game.title}</CardTitle>
          <CardDescription className="text-fluid-sm text-muted-foreground line-clamp-2">
            {game.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {game.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="card-content flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
          {game.difficulty && (
            <div className="flex items-center gap-1">
              <span className="font-medium">Difficulty:</span>
              <span>{game.difficulty}</span>
            </div>
          )}
          {game.playTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{game.playTime}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button asChild className="neu-btn flex-1">
            <Link to={`/games/${game.slug}`} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Play
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className="glass"
            asChild
          >
            <a 
              href={`/games/${game.slug}`} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`Open ${game.title} in new tab`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}