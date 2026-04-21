"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserById = void 0;
class GetUserById {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        if (!id) {
            throw new Error("El id es obligatorio");
        }
        return this.userRepository.findById(id);
    }
}
exports.GetUserById = GetUserById;
