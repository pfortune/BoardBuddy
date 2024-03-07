import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const buddyService = {
  buddyUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.buddyUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.buddyUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.buddyUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteUser(id) {
    const res = await axios.delete(`${this.buddyUrl}/api/users/${id}`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.buddyUrl}/api/users`);
    return res.data;
  },

  async createLocation(location) {
    const res = await axios.post(`${this.buddyUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocations() {
    const response = await axios.delete(`${this.buddyUrl}/api/locations`);
    return response.data;
  },

  async deleteLocation(id) {
    const response = await axios.delete(`${this.buddyUrl}/api/locations/${id}`);
    return response;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.buddyUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.buddyUrl}/api/locations/${id}`);
    return res.data;
  },

  async getAllGames() {
    const res = await axios.get(`${this.buddyUrl}/api/games`);
    return res.data;
  },

  async createGame(id, game) {
    const res = await axios.post(`${this.buddyUrl}/api/locations/${id}/games`, game);
    return res.data;
  },

  async deleteAllGames() {
    const res = await axios.delete(`${this.buddyUrl}/api/games`);
    return res.data;
  },

  async getGame(id) {
    const res = await axios.get(`${this.buddyUrl}/api/games/${id}`);
    return res.data;
  },

  async deleteGame(id) {
    const res = await axios.delete(`${this.buddyUrl}/api/games/${id}`);
    return res.data;
  },

  async getLocationsByCategory(category) {
    const res = await axios.get(`${this.buddyUrl}/api/categories/${category}/locations`);
    return res.data;
  },

  async getLocationsByUser(id) {
    const res = await axios.get(`${this.buddyUrl}/api/users/${id}/locations`);
    return res.data;
  },

  async getLocationCategories() {
    const res = await axios.get(`${this.buddyUrl}/api/categories/locations`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.buddyUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },
};
