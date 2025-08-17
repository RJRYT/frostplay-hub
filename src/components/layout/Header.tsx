import * as React from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SearchBar } from "@/components/ui/search-bar";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 glass backdrop-blur-md border-b border-glass-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-fluid-lg gradient-text transition-smooth hover:scale-105"
            aria-label="FrostPlay Home"
          >
            <Gamepad2 className="h-6 w-6 text-primary" />
            FrostPlay
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              className="flex-1"
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="glass hover:glow-primary transition-all duration-300"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden glass"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-glass-border animate-fade-in">
            <div className="space-y-4">
              <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                className="w-full"
              />
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  asChild
                  className="glass flex-1 mr-2"
                >
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}