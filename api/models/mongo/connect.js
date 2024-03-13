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
import * as mongooseSeeder from "mais-mongoose-seeder";
import { seedData } from "./seed-data.js";

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.DB);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", async function () {
    console.log(`Database connected to ${this.name} on ${this.host}`);
    const userCount = await Mongoose.model("User").countDocuments();

    if (userCount === 0) {
      console.log("No users found, seeding database...");
      await seed();
    } else {
      console.log("Existing data found, skipping seeding.");
    }
  });
}
