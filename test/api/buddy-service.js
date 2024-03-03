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
};