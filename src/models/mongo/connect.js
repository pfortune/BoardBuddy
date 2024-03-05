/**
 * Establishes connection to MongoDB using environment variables for configuration.
 * Includes error handling and logging for connection events.
 *
 * @module connectMongo
 * @author Peter Fortune
 * @date 04/03/2024
 */

import * as dotenv from "dotenv";
import Mongoose from "mongoose";

export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);

  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  // eslint-disable-next-line func-names
  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
  });
}