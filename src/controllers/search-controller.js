import { db } from "../models/db.js";

export const searchController = {
index: {
    handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    const locations = await db.locationStore.getAllLocations();
    const viewData = {
        title: "Board Buddy Search",
        user: loggedInUser,
        locations,
    };
    return h.view("search-view", viewData);
    },
},
  category: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getLocationsByCategory(request.params.category);
      console.log(locations);
      const viewData = {
        title: "Board Buddy Search Results",
        user: loggedInUser,
        locations,
      };
      return h.view("search-view", viewData);
    },
  },
};
