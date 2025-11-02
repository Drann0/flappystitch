import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, VolumeX, Trophy, RotateCcw, LogOut } from "lucide-react";
import { GAME_SETTINGS, type Bird, type Pipe } from "@shared/schema";

export default function Game() {
  const [, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showChloeePopup, setShowChloeePopup] = useState(false);
  const animationFrameRef = useRef<number>();
  const lastPipeSpawnRef = useRef<number>(0);
  const birdImageRef = useRef<HTMLImageElement | null>(null);
  const [birdImageLoaded, setBirdImageLoaded] = useState(false);
  const birdRef = useRef<Bird>({
    x: 80,
    y: GAME_SETTINGS.HEIGHT / 2,
    velocity: 0,
    rotation: 0,
  });
  const pipesRef = useRef<Pipe[]>([]);

  useEffect(() => {
    if (!sessionStorage.getItem("gameAccess")) {
      setLocation("/");
      return;
    }
    const savedHighScore = localStorage.getItem("flappyHighScore");
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
    const img = new Image();
    img.src = "/custom-bird.png";
    img.onload = () => {
      birdImageRef.current = img;
      setBirdImageLoaded(true);
    };
  }, [setLocation]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const jump = () => {
    if (!gameStarted) {
      setGameStarted(true);
      if (audioRef.current && !isMuted) {
        audioRef.current.play().catch(() => {});
      }
    }
    if (!gameOver) {
      birdRef.current.velocity = GAME_SETTINGS.JUMP_STRENGTH;
    }
  };

  const resetGame = () => {
    birdRef.current = {
      x: 80,
      y: GAME_SETTINGS.HEIGHT / 2,
      velocity: 0,
      rotation: 0,
    };
    pipesRef.current = [];
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setShowChloeePopup(false);
    lastPipeSpawnRef.current = 0;
    // ✅ REMOVED canvas pointerEvents manipulation — no longer needed
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gameAccess");
    if (audioRef.current) audioRef.current.pause();
    setLocation("/");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = 0;

    const spawnPipe = (currentTime: number) => {
      if (
        currentTime - lastPipeSpawnRef.current >
        GAME_SETTINGS.SPAWN_INTERVAL
      ) {
        const gapY =
          Math.random() *
            (GAME_SETTINGS.HEIGHT - GAME_SETTINGS.PIPE_GAP - 100) +
          50;
        pipesRef.current.push({
          x: GAME_SETTINGS.WIDTH,
          gapY,
          passed: false,
        });
        lastPipeSpawnRef.current = currentTime;
      }
    };

    const checkCollision = () => {
      const bird = birdRef.current;
      if (bird.y + GAME_SETTINGS.BIRD_SIZE > GAME_SETTINGS.HEIGHT || bird.y < 0)
        return true;
      for (const pipe of pipesRef.current) {
        if (
          bird.x + GAME_SETTINGS.BIRD_SIZE > pipe.x &&
          bird.x < pipe.x + GAME_SETTINGS.PIPE_WIDTH
        ) {
          if (
            bird.y < pipe.gapY ||
            bird.y + GAME_SETTINGS.BIRD_SIZE >
              pipe.gapY + GAME_SETTINGS.PIPE_GAP
          )
            return true;
        }
      }
      return false;
    };

    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      ctx.clearRect(0, 0, GAME_SETTINGS.WIDTH, GAME_SETTINGS.HEIGHT);

      const gradient = ctx.createLinearGradient(0, 0, 0, GAME_SETTINGS.HEIGHT);
      gradient.addColorStop(0, "#FFB6D9");
      gradient.addColorStop(1, "#FFF0F7");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, GAME_SETTINGS.WIDTH, GAME_SETTINGS.HEIGHT);

      ctx.fillStyle = "#FFD4E5";
      ctx.fillRect(0, GAME_SETTINGS.HEIGHT - 60, GAME_SETTINGS.WIDTH, 60);
      ctx.fillStyle = "#FFC1DC";
      for (let i = 0; i < GAME_SETTINGS.WIDTH; i += 30) {
        ctx.fillRect(i, GAME_SETTINGS.HEIGHT - 60, 25, 10);
      }

      if (gameStarted && !gameOver) {
        birdRef.current.velocity += GAME_SETTINGS.GRAVITY;
        birdRef.current.y += birdRef.current.velocity;
        birdRef.current.rotation = Math.min(
          Math.max(birdRef.current.velocity * 3, -30),
          90,
        );

        spawnPipe(currentTime);

        pipesRef.current = pipesRef.current.filter((pipe) => {
          pipe.x -= GAME_SETTINGS.PIPE_SPEED;
          if (
            !pipe.passed &&
            pipe.x + GAME_SETTINGS.PIPE_WIDTH < birdRef.current.x
          ) {
            pipe.passed = true;
            setScore((s) => {
              const newScore = s + 1;
              if (newScore === 100) {
                setShowChloeePopup(true);
                setTimeout(() => setShowChloeePopup(false), 5000);
              }
              if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem("flappyHighScore", newScore.toString());
              }
              return newScore;
            });
          }
          return pipe.x > -GAME_SETTINGS.PIPE_WIDTH;
        });

        if (checkCollision()) {
          setGameOver(true);
          if (audioRef.current) audioRef.current.pause();
          // ✅ Do NOT disable canvas pointer events — overlay handles it
        }
      }

      ctx.fillStyle = "#E91E8C";
      pipesRef.current.forEach((pipe) => {
        ctx.fillRect(pipe.x, 0, GAME_SETTINGS.PIPE_WIDTH, pipe.gapY);
        ctx.fillRect(
          pipe.x,
          pipe.gapY + GAME_SETTINGS.PIPE_GAP,
          GAME_SETTINGS.PIPE_WIDTH,
          GAME_SETTINGS.HEIGHT - pipe.gapY - GAME_SETTINGS.PIPE_GAP,
        );
        ctx.fillStyle = "#C71674";
        ctx.fillRect(pipe.x, pipe.gapY - 25, GAME_SETTINGS.PIPE_WIDTH, 25);
        ctx.fillRect(
          pipe.x,
          pipe.gapY + GAME_SETTINGS.PIPE_GAP,
          GAME_SETTINGS.PIPE_WIDTH,
          25,
        );
        ctx.fillStyle = "#E91E8C";
      });

      ctx.save();
      ctx.translate(
        birdRef.current.x + GAME_SETTINGS.BIRD_SIZE / 2,
        birdRef.current.y + GAME_SETTINGS.BIRD_SIZE / 2,
      );
      ctx.rotate((birdRef.current.rotation * Math.PI) / 180);
      if (birdImageLoaded && birdImageRef.current) {
        ctx.drawImage(
          birdImageRef.current,
          -GAME_SETTINGS.BIRD_SIZE / 2,
          -GAME_SETTINGS.BIRD_SIZE / 2,
          GAME_SETTINGS.BIRD_SIZE,
          GAME_SETTINGS.BIRD_SIZE,
        );
      } else {
        ctx.fillStyle = "#FF69B4";
        ctx.beginPath();
        ctx.arc(0, 0, GAME_SETTINGS.BIRD_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [gameStarted, gameOver, highScore]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      // Only trigger jump if not on game over screen
      if (!gameOver && !showChloeePopup) {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [gameStarted, gameOver, showChloeePopup]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-800 via-pink-700 to-pink-600 p-4 page-transition">
      <div className="mb-4 flex items-center justify-between w-full max-w-md">
        <Button variant="outline" size="icon" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={toggleMute}>
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>
      </div>

      <Card className="relative shadow-2xl overflow-hidden">
        <canvas
          ref={canvasRef}
          width={GAME_SETTINGS.WIDTH}
          height={GAME_SETTINGS.HEIGHT}
          onClick={jump}
          onTouchStart={(e) => {
            if (!gameOver && !showChloeePopup) {
              e.preventDefault();
              jump();
            }
          }}
          className={`cursor-pointer pixelated block select-none ${
            gameOver ? "touch-none" : ""
          }`}
          style={{ maxWidth: "100%", height: "auto" }}
        />

        {/* SCORE */}
        <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm px-6 py-2 rounded-lg">
            <p className="text-4xl font-pixel text-white tabular-nums">
              {score}
            </p>
          </div>
        </div>

        {/* START SCREEN */}
        {!gameStarted && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center space-y-4 px-6">
              <p className="text-2xl font-pixel text-white">TAP TO START</p>
              <p className="text-sm font-sans text-white/80">
                Tap Screen or Press SPACE
              </p>
            </div>
          </div>
        )}

        {/* GAME OVER */}
        {gameOver && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md">
            <div className="bg-card p-6 rounded-lg shadow-xl space-y-4 max-w-xs w-full mx-4">
              <h2 className="text-3xl font-pixel text-center text-destructive">
                GAME OVER
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                  <span className="font-sans text-muted-foreground">Score</span>
                  <span className="text-2xl font-pixel tabular-nums">
                    {score}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-md">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span className="font-sans text-foreground">Best</span>
                  </div>
                  <span className="text-2xl font-pixel text-primary tabular-nums">
                    {highScore}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={resetGame}
                  className="w-full font-pixel"
                  size="lg"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  PLAY AGAIN
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full font-sans"
                >
                  Exit to Menu
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 🎉 CHLOEE POPUP */}
        {showChloeePopup && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm text-center p-6 animate-fade-in">
            <img
              src="/chloee.png"
              alt="Chloee celebration"
              className="w-48 h-48 object-contain mb-4 rounded-full border-4 border-pink-400 shadow-lg"
            />
            <p className="text-2xl font-pixel text-pink-200 drop-shadow-md">
              NICE CHLOEE YOU'RE VERY PRO,
              <br />
              LOVE U MORE 💖 - you have 1 free will from me
            </p>
          </div>
        )}
      </Card>

      <p className="mt-4 text-sm text-white/60 font-sans text-center max-w-md px-4">
        {gameStarted ? "Keep flying!" : "Tap anywhere or press SPACE to flap"}
      </p>

      <audio ref={audioRef}>
        <source src="/game-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}