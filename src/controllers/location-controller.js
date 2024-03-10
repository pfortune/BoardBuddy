import { db } from "../models/db.js";
import { GameSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "Location",
        location: location,
      };
      return h.view("location-view", viewData);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          location.img = url;
          await db.locationStore.updateLocation(location);
        }
        return h.redirect(`/location/${location._id}`);
      } catch (err) {
        console.log(err);
        // eslint-disable-next-line no-restricted-globals
        return h.redirect(`/location/${location._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteImage: {
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (location && location.img) {
          await imageStore.deleteImage(location.img);
          location.img = ""; 
          await db.locationStore.updateLocation(location);
          console.log(`Image deleted successfully for location ${location._id}`);
        } else {
          console.log("Location not found or image does not exist.");
        }
        return h.redirect(`/location/${location._id}`);
      } catch (err) {
        console.error("Error deleting image:", err);
        // eslint-disable-next-line no-restricted-globals
        return h.redirect(`/location/${location._id}`);
      }
    },
  },

  addGame: {
    validate: {
      payload: GameSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const locationId = request.params.id; 
        const location = await db.locationStore.getLocationById(locationId);  
        return h
          .view("location-view", {
            title: "Add game error",
            location: location,
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const newGame = {
        title: request.payload.title,
        age: Number(request.payload.age),
        minPlayers: Number(request.payload.minPlayers),
        maxPlayers: Number(request.payload.maxPlayers),
        duration: Number(request.payload.duration),
        description: request.payload.description,
      };
      await db.gameStore.addGame(location._id, newGame);
      return h.redirect(`/location/${location._id}`);
    },
  },

  deleteGame: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.gameStore.deleteGame(request.params.gameid);
      return h.redirect(`/location/${location._id}`);
    },
  },
};
