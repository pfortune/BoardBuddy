import { db } from "../models/db.js";

export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Board Buddy",
      };
      return h.view("about-view", viewData);
    },
  },
};
