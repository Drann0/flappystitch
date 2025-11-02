// Storage interface for Flappy Bird game
// This game uses client-side storage (localStorage for high scores, sessionStorage for access control)
// No server-side data persistence needed

export interface IStorage {
  // No server-side storage needed for this game
}

export class MemStorage implements IStorage {
  constructor() {
    // Game state managed entirely on client side
  }
}

export const storage = new MemStorage();
