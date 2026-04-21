"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        if (!input.name?.trim()) {
            throw new Error("El nombre es obligatorio");
        }
        if (!input.email?.trim()) {
            throw new Error("El email es obligatorio");
        }
        const existing = await this.userRepository.findAll({ email: input.email.trim() });
        if (existing.length > 0) {
            throw new Error("Ya existe un usuario con ese email");
        }
        return this.userRepository.create({
            name: input.name.trim(),
            email: input.email.trim().toLowerCase()
        });
    }
}
exports.CreateUser = CreateUser;
