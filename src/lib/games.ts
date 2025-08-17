export interface Game {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  createdAt: string;
  buildPath: string;
  ogImage?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  playTime?: string;
}

export const games: Game[] = [
  {
    slug: 'frost-runner',
    title: 'Frost Runner',
    description: 'Navigate through icy obstacles in this fast-paced endless runner with stunning visual effects.',
    tags: ['Action', 'Endless', 'Casual'],
    thumbnail: 'games/frost-runner/thumbnail.png',
    featured: true,
    createdAt: '2024-01-15',
    buildPath: 'games/frost-runner/',
    difficulty: 'Medium',
    playTime: '10-30 min',
    ogImage: 'games/frost-runner/og-image.png'
  },
  {
    slug: 'neon-puzzle',
    title: 'Neon Puzzle',
    description: 'Solve mind-bending puzzles with glowing neon blocks in this atmospheric brain teaser.',
    tags: ['Puzzle', 'Strategy', 'Relaxing'],
    thumbnail: 'games/neon-puzzle/thumbnail.png',
    featured: false,
    createdAt: '2024-01-10',
    buildPath: 'games/neon-puzzle/',
    difficulty: 'Hard',
    playTime: '30-60 min'
  },
  {
    slug: 'cyber-defense',
    title: 'Cyber Defense',
    description: 'Defend your digital fortress against waves of cyber threats in this tower defense game.',
    tags: ['Strategy', 'Defense', 'Cyberpunk'],
    thumbnail: 'games/cyber-defense/thumbnail.png',
    featured: true,
    createdAt: '2024-01-05',
    buildPath: 'games/cyber-defense/',
    difficulty: 'Hard',
    playTime: '45-90 min'
  }
];

export const getGame = (slug: string): Game | undefined => {
  return games.find(game => game.slug === slug);
};

export const getFeaturedGames = (): Game[] => {
  return games.filter(game => game.featured);
};

export const getGamesByTag = (tag: string): Game[] => {
  return games.filter(game => game.tags.includes(tag));
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  games.forEach(game => {
    game.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const searchGames = (query: string): Game[] => {
  const lowercaseQuery = query.toLowerCase();
  return games.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.description.toLowerCase().includes(lowercaseQuery) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};