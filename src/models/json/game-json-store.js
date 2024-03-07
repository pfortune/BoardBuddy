/**
 * JSON-based storage for game data, facilitating CRUD operations.
 * Employs UUIDs for unique identification of games and links games to locations by location ID.
 *
 * @module gameJsonStore
 * @author Peter Fortune
 * @date 04/03/2024
 */

import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const gameJsonStore = {
  async getAllGames() {
    await db.read();
    return db.data.games;
  },

  async addGame(locationId, game) {
    await db.read();
    game._id = v4();
    game.locationid = locationId;
    db.data.games.push(game);
    await db.write();
    return game;
  },

  async getGamesByLocationId(id) {
    await db.read();
    let t = db.data.games.filter((game) => game.locationid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getGameById(id) {
    await db.read();
    let t = db.data.games.find((game) => game._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deleteGame(id) {
    await db.read();
    const index = db.data.games.findIndex((game) => game._id === id);
    if (index !== -1) db.data.games.splice(index, 1);
    await db.write();
  },

  async deleteAllGames() {
    db.data.games = [];
    await db.write();
  },

  async updateGame(game, updatedGame) {
    game.title = updatedGame.title;
    game.age = updatedGame.age;
    game.minPlayers = updatedGame.minPlayers;
    game.maxPlayers = updatedGame.maxPlayers;
    game.duration = updatedGame.duration;
    game.description = updatedGame.description;
    await db.write();
  },
};
