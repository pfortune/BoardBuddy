import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const gameApi = {
  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const { locationId } = request.params;
        const game = await db.gameStore.addGame(locationId, request.payload);
        if (game) {
          return h.response(game).code(201);
        }
        return Boom.badImplementation("error creating game");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  update: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.gameStore.updateGame({ _id: request.params.id }, request.payload);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Game with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.gameStore.deleteAllGames();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Game with this id");
      }
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const game = await db.gameStore.getGameById(request.params.id);
        if (!game) {
          return Boom.notFound("Game not found");
        }
        return game;
      } catch (err) {
        return Boom.serverUnavailable("No Game with this id");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const deletedGame = await db.gameStore.deleteGame(request.params.id);
        return h.response(deletedGame).code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Game with this id");
      }
    },
  },

  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const games = await db.gameStore.getAllGames();
        return h.response(games).code(200);
      } catch (err) {
        return Boom.serverUnavailable("No Games found");
      }
    },
  },

  findByLocation: {
    auth: false,
    handler: async function (request, h) {
      try {
        const games = await db.gameStore.getGamesByLocationId(request.params.locationId);
        return h.response(games).code(200);
      } catch (err) {
        return Boom.serverUnavailable("No games found for this location");
      }
    },
  },

  findCategories: {
    auth: false,
    handler: async function (request, h) {
      try {
        const games = await db.gameStore.getAllGames();
        const categories = games.map((game) => game.category);
        return h.response(categories).code(200);
      } catch (err) {
        return Boom.serverUnavailable("No games found");
      }
    },
  },
};
