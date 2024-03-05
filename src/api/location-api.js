import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const locationApi = {
  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const location = await db.locationStore.addLocation(request.payload);
        return h.response(location).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findAll: {
    auth: false,
    handler: async function(request, h) {
      try {
        const locations = await db.locationStore.getAllLocations();
        return h.response(locations).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("Location not found");
        }
        return h.response(location).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
  
  update: {
    auth: false,
    handler: async function(request, h) {
      try {
        await db.locationStore.update({ _id: request.params.id }, request.payload);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
  
  },

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        await db.locationStore.deleteLocationById(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      try {
        await db.locationStore.deleteAllLocations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findCategories: {
    auth: false,
    handler: async function(request, h) {
      try {
        const categories = await db.locationStore.getCategories();
        return h.response(categories).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    addGameToLocation: {
      auth: false,
      handler: async function(request, h) {
        try {
          await db.locationStore.addGameToLocation(request.params.locationId, request.params.gameId);
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },

    removeGameFromLocation: {
      auth: false,
      handler: async function(request, h) {
        try {
          await db.locationStore.removeGameFromLocation(request.params.locationId, request.params.gameId);
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },
  },
};
