export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Buddy",
      };
      return h.view("about-view", viewData);
    },
  },
};
