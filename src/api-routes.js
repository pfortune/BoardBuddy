/**
 * Defines API routes for handling operations related to users, games, and locations, mapping HTTP methods to corresponding handlers in the API.
 * This includes support for creating, updating, finding, and deleting users, games, and locations, both individually and in bulk.
 * Additionally, it provides routes for fetching categories for games and locations, as well as establishing relationships between users and locations, and locations and games.
 *
 * @module apiRoutes
 * @author Peter Fortune
 * @date 04/03/2024
 */

import { userApi } from "./api/user-api.js";
import { gameApi } from "./api/game-api.js";
import { locationApi } from "./api/location-api.js";

export const apiRoutes = [
  // User Routes
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "PUT", path: "/api/users/{id}", config: userApi.update },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "GET", path: "/api/users/{id}/locations", config: userApi.findLocationsByUser },

  // Game Routes
  { method: "POST", path: "/api/games", config: gameApi.create },
  { method: "PUT", path: "/api/games/{id}", config: gameApi.update },
  { method: "DELETE", path: "/api/games", config: gameApi.deleteAll },
  { method: "GET", path: "/api/games/{id}", config: gameApi.findOne },
  { method: "DELETE", path: "/api/games/{id}", config: gameApi.deleteOne },
  { method: "GET", path: "/api/games", config: gameApi.find },
  { method: "GET", path: "/api/games/{id}/locations", config: gameApi.findByLocation },

  // Location Routes
  { method: "POST", path: "/api/locations", config: locationApi.create },
  { method: "GET", path: "/api/locations", config: locationApi.find },
  { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "PUT", path: "/api/locations/{id}", config: locationApi.update },
  { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },
  { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },

  // Category Routes
  { method: "GET", path: "/api/categories/games", config: gameApi.findCategories },
  { method: "GET", path: "/api/categories/locations", config: locationApi.findCategories },
  { method: "GET", path: "/api/categories/{category}/locations", config: locationApi.findLocationsByCategory },

  // Relationship Management Routes
  { method: "POST", path: "/api/locations/{locationId}/games/{gameId}", config: locationApi.addGameToLocation },
  { method: "DELETE", path: "/api/locations/{locationId}/games/{gameId}", config: locationApi.removeGameFromLocation },
  { method: "GET", path: "/api/locations/{id}/games", config: locationApi.findGamesByLocation },

  // Geospatial Routes
  // Find locations near a user
  // { method: "GET", path: "/api/locations/near", config: locationApi.findLocationsNearUser },
];
