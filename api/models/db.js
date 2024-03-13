/**
 * Initialises data stores for users, locations, and games, supporting both JSON and MongoDB.
 * Chooses the data store type based on the provided `storeType` argument.
 *
 * @module db
 * @author Peter Fortune
 * @date 04/03/2024
 */

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { gameMongoStore } from "./mongo/game-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  locationStore: null,
  gameStore: null,

  init() {
      this.userStore = userMongoStore;
      this.locationStore = locationMongoStore;
      this.gameStore = gameMongoStore;
      connectMongo();
  },
};