import * as React from "react";
import { Heart, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-surface mt-section">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="font-bold text-fluid-lg gradient-text">FrostPlay</h3>
            <p className="text-fluid-sm text-muted-foreground">
              A modern gaming portfolio showcasing interactive experiences built with React and love for gaming.
            </p>
            <div className="flex items-center gap-1 text-fluid-sm text-muted-foreground">
              Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by AI
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-fluid-base">Quick Links</h4>
            <nav className="space-y-2" role="navigation" aria-label="Footer navigation">
              <a 
                href="#games" 
                className="block text-fluid-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Browse Games
              </a>
              <a 
                href="#featured" 
                className="block text-fluid-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Featured
              </a>
              <a 
                href="/sitemap.xml" 
                className="block text-fluid-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Sitemap
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-fluid-base">Connect</h4>
            <div className="flex gap-2">
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
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="glass hover:glow-secondary transition-all duration-300"
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="glass hover:glow-accent transition-all duration-300"
              >
                <a
                  href="mailto:hello@frostplay.dev"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-glass-border mt-8 pt-8 text-center">
          <p className="text-fluid-sm text-muted-foreground">
            © 2024 FrostPlay. All rights reserved. • PWA-enabled for offline gaming
          </p>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "FrostPlay",
            "description": "Modern gaming portfolio with offline-first gameplay",
            "url": "https://frostplay.dev",
            "author": {
              "@type": "Person",
              "name": "FrostPlay Developer"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://frostplay.dev/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </footer>
  );
}