/**
 * Handles CRUD operations for Game data in MongoDB.
 * Includes functionality for adding, retrieving, updating, and deleting games,
 * with special handling for association to locations.
 *
 * @module gameMongoStore
 * @author Peter Fortune
 * @date 04/03/2024
 * @see Game Model for game data structure and associations.
 */

import { Game } from "./game.js";

export const gameMongoStore = {
  async getAllGames() {
    const games = await Game.find().lean();
    return games;
  },

  async addGame(locationId, game) {
    game.locationid = locationId;
    const newGame = new Game(game);
    const gameObj = await newGame.save();
    return this.getGameById(gameObj._id);
  },

  async getGamesByLocationId(id) {
    const games = await Game.find({ locationid: id }).lean();
    return games;
  },

  async getGameById(id) {
    if (id) {
      const game = await Game.findOne({ _id: id }).lean();
      return game;
    }
    return null;
  },

  async deleteGame(id) {
    try {
      await Game.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllGames() {
    await Game.deleteMany({});
  },

  async updateGame(game, updatedGame) {
    const gameDoc = await Game.findOne({ _id: game._id });
    gameDoc.title = updatedGame.title;
    gameDoc.age = updatedGame.age;
    gameDoc.minPlayers = updatedGame.minPlayers;
    gameDoc.maxPlayers = updatedGame.maxPlayers;
    gameDoc.duration = updatedGame.duration;
    gameDoc.description = updatedGame.description;
    await gameDoc.save();
  },

  async gameStats() {
    return Game.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
  },
  
};
