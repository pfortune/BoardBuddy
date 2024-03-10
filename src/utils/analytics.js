import { db } from "../models/db.js";

export const Analytics = {
  async compileStats() {
    const userStats = await db.userStore.countUsers();
    const locationStats = await db.locationStore.locationStats();
    const gameStats = await db.gameStore.gameCount();

    return {
      userStats,
      locationStats,
      gameStats
    };
  }
};