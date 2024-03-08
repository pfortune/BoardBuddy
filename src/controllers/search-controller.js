import { db } from "../models/db.js";

export const searchController = {
index: {
    handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    const locations = await db.locationStore.getAllLocations();
    const categories = await db.locationStore.getLocationCategories();
    const viewData = {
        title: "Board Buddy Search",
        user: loggedInUser,
        locations,
        categories,
    };
    return h.view("search-view", viewData);
    },
},
  category: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getLocationsByCategory(request.params.category);
      const categories = await db.locationStore.getLocationCategories();
      const viewData = {
        title: "Board Buddy Search Results",
        user: loggedInUser,
        locations,
        categories
      };
      return h.view("search-view", viewData);
    },
  },
};
