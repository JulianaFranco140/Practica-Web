"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const crypto_1 = require("crypto");
class InMemoryUserRepository {
    constructor() {
        this.users = [];
    }
    async findAll(filters) {
        if (!filters?.name && !filters?.email) {
            return [...this.users];
        }
        return this.users.filter((user) => {
            const matchesName = filters.name
                ? user.name.toLowerCase().includes(filters.name.toLowerCase())
                : true;
            const matchesEmail = filters.email
                ? user.email.toLowerCase().includes(filters.email.toLowerCase())
                : true;
            return matchesName && matchesEmail;
        });
    }
    async findById(id) {
        const user = this.users.find((item) => item.id === id);
        return user ?? null;
    }
    async create(data) {
        const user = {
            id: (0, crypto_1.randomUUID)(),
            ...data
        };
        this.users.push(user);
        return user;
    }
    async update(id, data) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
            return null;
        }
        const updatedUser = {
            id,
            ...data
        };
        this.users[index] = updatedUser;
        return updatedUser;
    }
    async delete(id) {
        const initialLength = this.users.length;
        this.users = this.users.filter((item) => item.id !== id);
        return this.users.length < initialLength;
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
