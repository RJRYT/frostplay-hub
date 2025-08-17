# FrostPlay - Modern Gaming Portfolio

A cutting-edge gaming portfolio built with Vite, React, and Tailwind CSS featuring PWA capabilities, offline gameplay, and stunning visual effects.

## ✨ Features

- 🎮 **PWA-Enabled**: Full offline gaming experience
- 🎨 **Modern Design**: Glassmorphism, neumorphism, and fluid typography
- 📱 **Responsive**: Works seamlessly across all devices
- ⚡ **Performance**: Optimized with code splitting and caching
- 🔍 **SEO-Ready**: Complete meta tags and structured data
- ♿ **Accessible**: WCAG compliant with keyboard navigation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Game Development

### Adding a New Game

1. Create game directory: `public/games/your-game-slug/`
2. Add game files including `index.html`
3. Update `src/lib/games.ts` with game metadata
4. Generate thumbnail image
5. Build and deploy

### Game Structure
```
public/games/your-game/
├── index.html          # Main game file
├── thumbnail.png       # Game thumbnail (1024x576)
├── assets/            # Game assets
└── manifest.json      # Game manifest (optional)
```

## 🛠 Technology Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **PWA**: vite-plugin-pwa with Workbox
- **Routing**: React Router v6
- **UI**: Custom components with shadcn/ui base
- **Icons**: Lucide React

## 📦 Build Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build locally
- `npm run type-check` - TypeScript checking

## 🎨 Design System

The project uses a comprehensive design system with:

- **Colors**: HSL-based with semantic tokens
- **Typography**: Fluid responsive scales
- **Components**: Glass and neumorphic effects
- **Animations**: CSS keyframes with reduced motion support
- **Layout**: Container queries and responsive design

## 🔧 Configuration

### PWA Settings
The PWA is configured in `vite.config.ts` with:
- Service worker for caching
- Offline fallbacks
- Install prompts
- Background sync

### Design Tokens
All design tokens are defined in `src/index.css`:
- Color variables (HSL format)
- Gradients and shadows
- Typography scales
- Animation timings

## 📱 PWA Features

- **Offline Gaming**: Games work without internet
- **Install Prompt**: Native app-like installation
- **Background Sync**: Queue actions when offline
- **Push Notifications**: Game updates and scores
- **Responsive Design**: Mobile-first approach

## 🚀 Deployment

### Vercel/Netlify (Recommended)
```bash
npm run build
# Deploy dist/ folder
```

### Manual Deployment
```bash
# Build the project
npm run build

# Upload dist/ contents to your web server
# Ensure proper routing for SPA
```

## 🎮 Demo Games

The portfolio includes demo games:

1. **Frost Runner** - Endless runner with ice effects
2. **Neon Puzzle** - Glowing block puzzle game  
3. **Cyber Defense** - Tower defense strategy

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add your game to `public/games/`
4. Update game metadata
5. Submit pull request

## 📄 License

MIT License - feel free to use for your own gaming portfolio!

## 🙏 Acknowledgments

Built with modern web technologies and a passion for gaming experiences.