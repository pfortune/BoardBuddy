// utils/analytics.js
import { db } from "../models/db.js";

export const Analytics = {
  async compileStats() {
    const userStats = await db.userStore.countUsers();
    const locationStats = await db.locationStore.locationStats();
    const gameStats = await db.gameStore.gameStats();
    
    // Combine or manipulate the stats data as needed for your analytics
    return {
      userStats,
      locationStats,
      gameStats
    };
  }
};
