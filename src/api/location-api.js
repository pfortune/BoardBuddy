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

  findByCategory: {
    auth: false,
    handler: async function(request, h) {
      try {
        const locations = await db.locationStore.getLocationsByCategory(request.params.category);
        return h.response(locations).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
