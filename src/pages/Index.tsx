import * as React from "react";
import { Gamepad2, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/ui/game-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InstallPrompt } from "@/components/ui/install-prompt";
import { games, searchGames, getAllTags } from "@/lib/games";

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  
  // Handle URL search parameter
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);
  
  const allTags = getAllTags();
  
  const filteredGames = React.useMemo(() => {
    let result = games;
    
    if (searchQuery) {
      result = searchGames(searchQuery);
    }
    
    if (selectedTag) {
      result = result.filter(game => game.tags.includes(selectedTag));
    }
    
    return result;
  }, [searchQuery, selectedTag]);

  const featuredGames = games.filter(game => game.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-elevated">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main id="main" role="main">
        {/* Hero Section */}
        <section className="section-spacing relative overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="glass animate-float">
                  <Sparkles className="h-3 w-3 mr-1" />
                  PWA-Enabled Gaming Portfolio
                </Badge>
                
                <h1 className="text-fluid-3xl font-bold gradient-text leading-tight">
                  Welcome to FrostPlay
                </h1>
                
                <p className="text-fluid-xl text-muted-foreground max-w-2xl mx-auto">
                  Immerse yourself in cutting-edge React games with stunning visuals, 
                  offline gameplay, and seamless performance across all devices.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="neu-btn animate-glow-pulse"
                  onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Explore Games
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass"
                  onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Featured
                </Button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-fluid-sm">Lightning Fast</span>
                </div>
                <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <span className="text-fluid-sm">Offline Ready</span>
                </div>
                <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
                  <Gamepad2 className="h-4 w-4 text-secondary" />
                  <span className="text-fluid-sm">Cross Platform</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          </div>
        </section>

        {/* Featured Games */}
        {featuredGames.length > 0 && (
          <section id="featured" className="section-spacing bg-surface/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-fluid-2xl font-bold gradient-text mb-4">Featured Games</h2>
                <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto">
                  Hand-picked experiences showcasing the best of modern web gaming
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGames.map((game) => (
                  <GameCard 
                    key={game.slug} 
                    game={game} 
                    className="animate-fade-in"
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Games */}
        <section id="games" className="section-spacing">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-fluid-2xl font-bold gradient-text mb-4">Game Library</h2>
              <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto">
                Browse our complete collection of interactive experiences
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  onClick={() => setSelectedTag(null)}
                  className={selectedTag === null ? "neu-btn" : "glass"}
                  size="sm"
                >
                  All Games
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={selectedTag === tag ? "neu-btn" : "glass"}
                    size="sm"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, index) => (
                <GameCard 
                  key={game.slug} 
                  game={game} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-12">
                <div className="glass-card max-w-md mx-auto p-8">
                  <Gamepad2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-fluid-lg font-semibold mb-2">No games found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTag(null);
                    }}
                    className="neu-btn"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <InstallPrompt />
    </div>
  );
};

export default Index;
