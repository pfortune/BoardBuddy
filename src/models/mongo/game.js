/**
 * Schema definition for Game entities, including details and location linkage.
 *
 * @module Game
 * @author Peter Fortune
 * @date 04/03/2024
 */

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const gameSchema = new Schema({
    title: String,
    age: Number,
    minPlayers: Number,
    maxPlayers: Number,
    duration: Number,
    description: String,
    category: String,
    locations: [{
        type: Schema.Types.ObjectId,
        ref: "Location"
    }]
});

export const Game = Mongoose.model("Game", gameSchema);