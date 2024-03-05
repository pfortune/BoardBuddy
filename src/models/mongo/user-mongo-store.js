/**
 * Interface for CRUD operations on User data in MongoDB.
 * Supports retrieving all users, finding by ID or email, adding, and deleting users.
 *
 * @module userMongoStore
 * @author Peter Fortune
 * @date 04/03/2024
 * @see User Model for user data structure.
 */

import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async updateUser(id, data) {
    if(id && data) {
        const updatedUser = await User.updateOne({ _id: id }, data);
        return updatedUser;
    }
    return null;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
