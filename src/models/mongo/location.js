/**
 * Location model schema definition.
 * Defines structure for location data including title, category, coordinates, and user association.
 *
 * @module Location
 * @author Peter Fortune
 * @date 04/03/2024
 * @see User Model for the structure of user data.
 * @see Game Model for how games are linked to locations.
 */

import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
    title: String,
    category: String,
    x: Number,
    y: Number,
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Location = Mongoose.model("Location", locationSchema);