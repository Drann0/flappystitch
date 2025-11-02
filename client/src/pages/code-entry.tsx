import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Gamepad2 } from "lucide-react";

const VALID_CODE = "250725";

export default function CodeEntry() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.toUpperCase() === VALID_CODE) {
      sessionStorage.setItem("gameAccess", "granted");
      setLocation("/game");
    } else {
      setError("Invalid access code");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-400 via-pink-300 to-pink-200 dark:from-pink-900 dark:via-pink-800 dark:to-pink-700 p-4 page-transition">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-16 bg-white dark:bg-pink-300/20 rounded-full opacity-70"></div>
        <div className="absolute top-40 right-20 w-32 h-24 bg-white dark:bg-pink-300/20 rounded-full opacity-60"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-20 bg-white dark:bg-pink-300/20 rounded-full opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-18 bg-white dark:bg-pink-300/20 rounded-full opacity-65"></div>
      </div>

      <Card className={`w-full max-w-md shadow-2xl relative z-10 ${isShaking ? 'animate-shake' : ''}`}>
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="bg-primary text-primary-foreground p-4 rounded-lg">
              <Gamepad2 className="w-12 h-12" />
            </div>
          </div>
          <CardTitle className="text-4xl font-pixel tracking-wider text-foreground">
            FLAPPY BIRD
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground font-sans">
            Tap to Fly • Dodge to Survive
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="code-input" className="text-sm font-pixel text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                ACCESS CODE
              </label>
              <Input
                id="code-input"
                data-testid="input-access-code"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                placeholder="Enter code"
                className="text-xl text-center tracking-widest uppercase font-mono h-12"
                autoComplete="off"
                autoFocus
              />
              {error && (
                <p data-testid="text-error-message" className="text-sm text-destructive font-sans text-center">
                  {error}
                </p>
              )}
            </div>

            <Button
              data-testid="button-submit-code"
              type="submit"
              className="w-full h-12 text-lg font-pixel"
              size="lg"
            >
              PLAY GAME
            </Button>
          </form>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center font-sans">
              Hint: Think of a special date (DDMMYY)
            </p>
          </div>
        </CardContent>
      </Card>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
