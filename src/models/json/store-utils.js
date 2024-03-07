/**
 * Initialises a LowDB instance with JSON file storage for users, locations, and games.
 * Sets up default structures for each collection if not already present in the file.
 *
 * @module LowDBSetup
 * @author Peter Fortune
 * @date 04/03/2024
 */

import { JSONFilePreset } from "lowdb/node";

export const db = await JSONFilePreset("src/models/json/db.json", {
  users: [],
  locations: [],
  games: [],
});
