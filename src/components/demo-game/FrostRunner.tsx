import * as React from "react";

export function FrostRunner() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const gameStateRef = React.useRef({
    player: { x: 100, y: 200, width: 30, height: 30, dy: 0, grounded: false },
    obstacles: [] as Array<{ x: number; y: number; width: number; height: number }>,
    score: 0,
    gameSpeed: 2,
    gameRunning: true,
    keys: {} as Record<string, boolean>
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gameState = gameStateRef.current;
    
    // Initialize game
    gameState.player.y = canvas.height - 100;
    
    // Input handling
    const handleKeyDown = (e: KeyboardEvent) => {
      gameState.keys[e.key] = true;
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (gameState.player.grounded) {
          gameState.player.dy = -15;
          gameState.player.grounded = false;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameState.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Generate obstacles
    const generateObstacle = () => {
      if (Math.random() < 0.01) {
        gameState.obstacles.push({
          x: canvas.width,
          y: canvas.height - 80,
          width: 30,
          height: 50
        });
      }
    };

    // Game loop
    const gameLoop = () => {
      if (!gameState.gameRunning) return;

      // Clear canvas
      ctx.fillStyle = 'linear-gradient(135deg, #1a1a2e, #16213e)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background effect
      ctx.fillStyle = '#00ccff20';
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(
          (Date.now() * 0.1 + i * 200) % (canvas.width + 100) - 100,
          i * 100,
          80,
          20
        );
      }

      // Update player physics
      gameState.player.dy += 0.8; // gravity
      gameState.player.y += gameState.player.dy;

      // Ground collision
      const groundY = canvas.height - 50;
      if (gameState.player.y + gameState.player.height > groundY) {
        gameState.player.y = groundY - gameState.player.height;
        gameState.player.dy = 0;
        gameState.player.grounded = true;
      }

      // Generate and update obstacles
      generateObstacle();
      gameState.obstacles = gameState.obstacles.filter(obstacle => {
        obstacle.x -= gameState.gameSpeed;
        
        // Collision detection
        if (
          gameState.player.x < obstacle.x + obstacle.width &&
          gameState.player.x + gameState.player.width > obstacle.x &&
          gameState.player.y < obstacle.y + obstacle.height &&
          gameState.player.y + gameState.player.height > obstacle.y
        ) {
          gameState.gameRunning = false;
        }
        
        return obstacle.x > -obstacle.width;
      });

      // Update score and speed
      gameState.score += 1;
      gameState.gameSpeed = 2 + gameState.score * 0.001;

      // Draw ground
      ctx.fillStyle = '#00ccff';
      ctx.fillRect(0, groundY, canvas.width, 50);
      
      // Add ground glow effect
      ctx.shadowColor = '#00ccff';
      ctx.shadowBlur = 20;
      ctx.fillRect(0, groundY, canvas.width, 5);
      ctx.shadowBlur = 0;

      // Draw player with glow
      ctx.shadowColor = '#ff6b6b';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#ff6b6b';
      ctx.fillRect(
        gameState.player.x,
        gameState.player.y,
        gameState.player.width,
        gameState.player.height
      );
      ctx.shadowBlur = 0;

      // Draw obstacles with glow
      ctx.shadowColor = '#ffd93d';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ffd93d';
      gameState.obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });
      ctx.shadowBlur = 0;

      // Draw UI
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px Arial';
      ctx.fillText(`Score: ${gameState.score}`, 20, 40);
      ctx.fillText(`Speed: ${gameState.gameSpeed.toFixed(1)}x`, 20, 70);

      // Game over screen
      if (!gameState.gameRunning) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 50);
        
        ctx.font = '24px Arial';
        ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 50);
        ctx.textAlign = 'left';
      }

      requestAnimationFrame(gameLoop);
    };

    // Restart game
    const handleRestart = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        gameState.player = { x: 100, y: canvas.height - 100, width: 30, height: 30, dy: 0, grounded: false };
        gameState.obstacles = [];
        gameState.score = 0;
        gameState.gameSpeed = 2;
        gameState.gameRunning = true;
      }
    };

    window.addEventListener('keydown', handleRestart);

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', handleRestart);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Instructions overlay */}
      <div className="absolute top-4 right-4 bg-black/70 p-3 rounded-lg text-white text-sm">
        <div className="font-semibold mb-1">Controls:</div>
        <div>Space/↑ - Jump</div>
        <div>R - Restart</div>
      </div>
    </div>
  );
}