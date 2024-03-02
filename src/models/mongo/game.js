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
    locationid: {
        type: Schema.Types.ObjectId,
        ref: "Location"
    }
});

export const Game = Mongoose.model("Game", gameSchema);