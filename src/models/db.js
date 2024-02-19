import { userJsonStore } from "./json/user-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { gameJsonStore } from "./json/game-json-store.js";

export const db = {
  userStore: null,
  locationStore: null,
  gameStore: null,

  init(storeType) {
    this.userStore = userJsonStore;
    this.locationStore = locationJsonStore;
    this.gameStore = gameJsonStore;
  },
};