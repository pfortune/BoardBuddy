import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { locationController } from "./controllers/location-controller.js";
import { aboutController } from "./controllers/about-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/add", config: dashboardController.addlocation },
  { method: "GET", path: "/dashboard/delete/{id}", config: dashboardController.deletelocation },

  { method: "GET", path: "/location/{id}", config: locationController.index },
  { method: "POST", path: "/location/{id}/add/game", config: locationController.addgame },
  { method: "GET", path: "/location/{id}/delete/game/{gameid}", config: locationController.deletegame },

  { method: "GET", path: "/about", config: aboutController.index },
];
