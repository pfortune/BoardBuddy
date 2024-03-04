import axios from "axios";
import { serviceUrl } from "../fixtures.js";

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

    async deleteUser(id) {
        const res = await axios.delete(`${this.buddyUrl}/api/users/${id}`);
        return res.data;
    },

    async deleteAllUsers() {
        const res = await axios.delete(`${this.buddyUrl}/api/users`);
        return res.data;
    },

    async getAllUsers() {
        const res = await axios.get(`${this.buddyUrl}/api/users`);
        return res.data;
    },

    async createGame(game) {
        const res = await axios.post(`${this.buddyUrl}/api/games`, game);
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

    async deleteAllGames() {
        const res = await axios.delete(`${this.buddyUrl}/api/games`);
        return res.data;
    },

    async getAllGames() {
        const res = await axios.get(`${this.buddyUrl}/api/games`);
        return res.data;
    },

    async createLocation(location) {
        const res = await axios.post(`${this.buddyUrl}/api/locations`, location);
        return res.data;
    },

    async getLocation(id) {
        const res = await axios.get(`${this.buddyUrl}/api/locations/${id}`);
        return res.data;
    },

    async getLocationsByUser(id) {
        const res = await axios.get(`${this.buddyUrl}/api/users/${id}/locations`);
        return res.data;
    },

    async getLocationsByCategory(id) {
        const res = await axios.get(`${this.buddyUrl}/api/categories/${id}/locations`);
        return res.data;
    },
    
    async getGamesByLocation(id) {
        const res = await axios.get(`${this.buddyUrl}/api/locations/${id}/games`);
        return res.data;
    },

    async deleteLocation(id) {
        const res = await axios.delete(`${this.buddyUrl}/api/locations/${id}`);
        return res.data;
    },

    async deleteAllLocations() {
        const res = await axios.delete(`${this.buddyUrl}/api/locations`);
        return res.data;
    },

    async getAllLocations() {
        const res = await axios.get(`${this.buddyUrl}/api/locations`);
        return res.data;
    },
};