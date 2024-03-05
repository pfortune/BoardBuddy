/**
 * Schema for User entities with basic personal and authentication information.
 *
 * @module User
 * @author Peter Fortune
 * @date 04/03/2024
 */


import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

export const User = Mongoose.model("User", userSchema);