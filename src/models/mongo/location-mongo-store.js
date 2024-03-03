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
