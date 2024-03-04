/**
 * Provides a set of asynchronous functions to interact with location data in a MongoDB database.
 * These functions allow you to retrieve all locations, a location by its ID or category, 
 * add a new location, and delete a location either by its ID or delete all locations.
 * It integrates with a separate `gameMongoStore` to associate games with specific locations.
 *
 * @module locationMongoStore
 * @author Peter Fortune
 * @date 04/03/2024
 * @see Location Model for the structure of location data.
 * @see gameMongoStore for how games are associated with locations.
 */

import { Location } from "./location.js";
import { gameMongoStore } from "./game-mongo-store.js";

export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      if (location) {
        location.games = await gameMongoStore.getGamesByLocationId(location._id);
      }
      return location;
    }
    return null;
  },

  async getLocationsByCategory(category) {
    const locations = await Location.find({ category: category }).lean();
    return locations;
  },

  async addLocation(location) {
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },

  async getLocations(id) {
    const location = await Location.find({ userid: id }).lean();
    return location;
  },

  async deleteLocationById(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },
};
