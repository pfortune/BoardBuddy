import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserArray, UserSpec, IdSpec } from "../models/joi-schema.js";
import { validationError } from "./logger.js";

export const userApi = {
  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a new user",
    notes: "Returns the created user details",
    validate: {
      payload: UserSpec,
      failAction: validationError,
    },
    response: {
      schema: UserSpec,
      failAction: validationError,
    },
  },

  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    response: {
      schema: UserArray,
      failAction: validationError,
    },
  },

  update: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }

        const updatedUser = await db.userStore.updateUser({ _id: request.params.id }, request.payload);
        return h.response(updatedUser).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a user by ID",
    notes: "Updates user details and returns the updated user",
    validate: {
      params: { id: IdSpec },
      payload: UserSpec,
      failAction: validationError,
    },
    response: {
      schema: UserSpec,
      failAction: validationError,
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users",
    notes: "Deletes all users from the database",
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id - service unavailable");
      }
    },
    tags: ["api"],
    description: "Get a user by ID",
    notes: "Returns user details for the specified ID",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpec, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        await db.userStore.deleteUserById(request.params.id);

        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No User with this id - service unavailable");
      }
    },
    tags: ["api"],
    description: "Delete a user by ID",
    notes: "Deletes a single user based on the ID provided",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  findLocationsByUser: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        const locations = await db.locationStore.getLocationsByUser(user._id);
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Find locations by User ID",
    notes: "Returns a list of locations associated with the user ID",
    validate: {
      params: { id: IdSpec },
      failAction: validationError,
    },
  },
};
