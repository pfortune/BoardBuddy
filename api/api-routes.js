/**
 * Defines API routes for handling operations related to users, games, and locations, mapping HTTP methods to corresponding handlers in the API.
 * This includes support for creating, updating, finding, and deleting users, games, and locations, both individually and in bulk.
 * Additionally, it provides routes for fetching categories for games and locations, as well as establishing relationships between users and locations, and locations and games.
 * Routes for authentication and geospatial queries are also defined.
 *
 * @module apiRoutes
 * @author Peter Fortune
 * @date 04/03/2024
 */

import { userApi } from "./controllers/user-api.js";
import { gameApi } from "./controllers/game-api.js";
import { adminApi } from "./controllers/admin-api.js";
import { locationApi } from "./controllers/location-api.js";

export const apiRoutes = [
  // User Routes
  { method: "GET", path: "/api/v1/users", config: userApi.findAll },
  { method: "POST", path: "/api/v1/users", config: userApi.create },
  { method: "DELETE", path: "/api/v1/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/v1/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/v1/users/{id}", config: userApi.deleteOne },
  { method: "PUT", path: "/api/v1/users/{id}", config: userApi.updateOne },

  // Additional Admin Routes
  { method: "GET", path: "/api/v1/admin/stats", config: adminApi.getStats },
  { method: "GET", path: "/api/v1/admin/users", config: adminApi.listUsers },
  { method: "DELETE", path: "/api/v1/admin/users/{userId}", config: adminApi.deleteUser },

  // User Authentication Routes
  { method: "POST", path: "/api/v1/users/login", config: userApi.authenticate },
  { method: "POST", path: "/api/v1/users/logout", config: userApi.logout },

  // Routes for Adding and Updating Games
  { method: "POST", path: "/api/v1/locations/{locationId}/games", config: gameApi.addToLocation },
  { method: "PUT", path: "/api/v1/locations/{locationId}/games/{gameId}", config: gameApi.updateInLocation },

  // Image Management Routes for Locations
  { method: "POST", path: "/api/v1/locations/{locationId}/images", config: locationApi.uploadImage },
  { method: "DELETE", path: "/api/v1/locations/{locationId}/images/{imageId}", config: locationApi.removeImage },

  // Game Routes
  { method: "GET", path: "/api/v1/games", config: gameApi.findAll },
  { method: "GET", path: "/api/v1/games/{id}", config: gameApi.findOne },
  { method: "POST", path: "/api/v1/games", config: gameApi.create },
  { method: "DELETE", path: "/api/v1/games", config: gameApi.deleteAll },
  { method: "DELETE", path: "/api/v1/games/{id}", config: gameApi.deleteOne },
  { method: "PUT", path: "/api/v1/games/{id}", config: gameApi.updateOne },

  // Location Routes
  { method: "POST", path: "/api/v1/locations", config: locationApi.create },
  { method: "DELETE", path: "/api/v1/locations", config: locationApi.deleteAll },
  { method: "GET", path: "/api/v1/locations", config: locationApi.findAll },
  { method: "GET", path: "/api/v1/locations/{id}", config: locationApi.findOne },
  { method: "DELETE", path: "/api/v1/locations/{id}", config: locationApi.deleteOne },
  { method: "PUT", path: "/api/v1/locations/{id}", config: locationApi.updateOne },

  // Category Routes
  { method: "GET", path: "/api/v1/categories/games", config: gameApi.findCategories },
  { method: "GET", path: "/api/v1/categories/locations", config: locationApi.findCategories },
  { method: "GET", path: "/api/v1/categories/{category}/locations", config: locationApi.findLocationsByCategory },

  // Geospatial Routes
  // Find locations near a user
  { method: "GET", path: "/api/v1/locations/near", config: locationApi.findLocationsNearUser },
];
