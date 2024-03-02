import { Game } from "./game.js";

export const gameMongoStore = {
  async getGamesByLocationId(id) {
    const games = await Game.find({ locationid: id }).lean();
    return games;
  },
  
  async addGame(locationId, game) {
    game.locationid = locationId;
    const newGame = new Game(game);
    const gameObj = await newGame.save();
    return gameObj;
  },

  async deleteGame(id) {
    try {
      await Game.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },
}
