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