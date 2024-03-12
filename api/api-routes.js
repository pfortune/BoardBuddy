/**
 * Defines API routes for handling operations related to users, games, and locations, mapping HTTP methods to corresponding handlers in the API.
 * This includes support for creating, updating, finding, and deleting users, games, and locations, both individually and in bulk.
 * Additionally, it provides routes for fetching categories for games and locations, as well as establishing relationships between users and locations, and locations and games.
 *
 * @module apiRoutes
 * @author Peter Fortune
 * @date 04/03/2024
 */

import { userApi } from "./controllers/user-api.js";
import { gameApi } from "./controllers/game-api.js";
import { locationApi } from "./controllers/location-api.js";

export const apiRoutes = [
  // User Routes
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  // { method: "GET", path: "/api/users/{id}/locations", config: userApi.findLocationsByUser },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  // Game Routes
  { method: "GET", path: "/api/games", config: gameApi.find },
  { method: "GET", path: "/api/games/{id}", config: gameApi.findOne },
  { method: "POST", path: "/api/locations/{id}/games", config: gameApi.create },
  { method: "DELETE", path: "/api/games", config: gameApi.deleteAll },
  { method: "DELETE", path: "/api/games/{id}", config: gameApi.deleteOne },

  // Location Routes
  { method: "POST", path: "/api/locations", config: locationApi.create },
  { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
  { method: "GET", path: "/api/locations", config: locationApi.find },
  { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },

  // Category Routes
  // { method: "GET", path: "/api/categories/games", config: gameApi.findCategories },
  // { method: "GET", path: "/api/categories/locations", config: locationApi.findCategories },
  // { method: "GET", path: "/api/categories/{category}/locations", config: locationApi.findLocationsByCategory },

  // Geospatial Routes
  // Find locations near a user
  // { method: "GET", path: "/api/locations/near", config: locationApi.findLocationsNearUser },
];
