import { LocationSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      let locations;
      if (loggedInUser.permission === "ADMIN") {
        locations = await db.locationStore.getAllLocations();
      } else {
        locations = await db.locationStore.getLocations(loggedInUser._id);
      }

      const viewData = {
        title: "Buddy Dashboard",
        user: loggedInUser,
        locations: locations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addLocation: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        let locations;
      const loggedInUser = request.auth.credentials;

      if (loggedInUser.permission === "ADMIN") {
        locations = await db.locationStore.getAllLocations();
      } else {
        locations = await db.locationStore.getLocations(loggedInUser._id);
      }

        return h.view("dashboard-view", { title: "Add Location error", locations, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;


      const newLocation = {
        userid: loggedInUser._id,
        locations,
        title: request.payload.title,
        category: request.payload.category,
      };
      await db.locationStore.addLocation(newLocation);
      return h.redirect("/dashboard");
    },
  },

  deleteLocation: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.locationStore.deleteLocationById(location._id);
      return h.redirect("/dashboard");
    },
  },
};
