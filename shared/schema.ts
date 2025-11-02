import { z } from "zod";

// Game state types
export interface Bird {
  x: number;
  y: number;
  velocity: number;
  rotation: number;
}

export interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

export interface GameState {
  bird: Bird;
  pipes: Pipe[];
  score: number;
  highScore: number;
  gameOver: boolean;
  gameStarted: boolean;
}

// Code validation schema
export const codeValidationSchema = z.object({
  code: z.string().min(1, "Please enter a code"),
});

export type CodeValidation = z.infer<typeof codeValidationSchema>;

// Game settings
export const GAME_SETTINGS = {
  WIDTH: 375,
  HEIGHT: 667,
  GRAVITY: 0.5,
  JUMP_STRENGTH: -9,
  BIRD_SIZE: 40,
  PIPE_WIDTH: 60,
  PIPE_GAP: 180,
  PIPE_SPEED: 2,
  SPAWN_INTERVAL: 1500,
} as const;
