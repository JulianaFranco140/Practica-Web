"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = void 0;
class DeleteUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        if (!id) {
            throw new Error("El id es obligatorio");
        }
        return this.userRepository.delete(id);
    }
}
exports.DeleteUser = DeleteUser;
