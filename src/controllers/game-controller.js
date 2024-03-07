import { GameSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const gameController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const game = await db.gameStore.getGameById(request.params.gameid);
      const viewData = {
        title: "Edit Game",
        location: location,
        game: game,
      };
      return h.view("game-view", viewData);
    },
  },

  update: {
    validate: {
      payload: GameSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("game-view", { title: "Edit game error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const game = await db.gameStore.getGameById(request.params.gameid);
      const newGame = {
        title: request.payload.title,
        age: Number(request.payload.age),
        minPlayers: Number(request.payload.minPlayers),
        maxPlayers: Number(request.payload.maxPlayers),
        duration: Number(request.payload.duration),
        description: request.payload.description,
      };
      await db.gameStore.updateGame(game, newGame);
      return h.redirect(`/location/${request.params.id}`);
    },
  },
};
