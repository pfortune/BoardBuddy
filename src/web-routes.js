import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { locationController } from "./controllers/location-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { searchController } from "./controllers/search-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/add", config: dashboardController.addLocation },
  { method: "GET", path: "/dashboard/delete/{id}", config: dashboardController.deleteLocation },

  { method: "GET", path: "/search", config: searchController.index},
  { method: "GET", path: "/search/{category}", config: searchController.category },

  { method: "GET", path: "/location/{id}", config: locationController.index },
  { method: "POST", path: "/location/{id}/add/game", config: locationController.addGame },
  { method: "GET", path: "/location/{id}/delete/game/{gameid}", config: locationController.deleteGame },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
