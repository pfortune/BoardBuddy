import { userJsonStore } from "./json/user-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { gameJsonStore } from "./json/game-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { gameMongoStore } from "./mongo/game-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  locationStore: null,
  gameStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.locationStore = locationMongoStore;
        this.gameStore = gameMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userJsonStore;
        this.locationStore = locationJsonStore;
        this.gameStore = gameJsonStore;
    }
  },
};