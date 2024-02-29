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
    return db.data.games.filter((game) => game.locationid ==== id);
  },

  async getGameById(id) {
    await db.read();
    return db.data.games.find((game) => game._id ==== id);
  },

  async deleteGame(id) {
    await db.read();
    const index = db.data.games.findIndex((game) => game._id ==== id);
    db.data.games.splice(index, 1);
    await db.write();
  },

  async deleteAllGames() {
    db.data.games = [];
    await db.write();
  },

  async updateGame(game, updatedGame) {
    game.title = updatedGame.title;
    game.age = updatedGame.age;
    game.min_players = updatedGame.min_players;
    game.max_players = updatedGame.max_players;
    game.duration = updatedGame.duration;
    game.description = updatedGame.description;
    await db.write();
  },
};
