import { db } from "../models/db.js";

export const adminController = {
  index: {
    plugins: {
      hacli: {
        permissions: ["ADMIN"],
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const filteredUsers = users.filter(user => user.permission !== "ADMIN");

      const viewData = {
        title: "Admin Dashboard",
        user: loggedInUser,
        users: filteredUsers,
      };
      return h.view("admin-view", viewData);
    },
  },

  deleteUser: {
    plugins: {
      hacli: {
        permissions: ["ADMIN"],
      },
    },
    handler: async function (request, h) {
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admin");
    },
  },

  showUser: {
    plugins: {
      hacli: {
        permissions: ["ADMIN"],
      },
    },
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      const viewData = {
        title: "Edit User",
        user: user,
      };
      return h.view("admin-view-user", viewData);
    },
  },
};
