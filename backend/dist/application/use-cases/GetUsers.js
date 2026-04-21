"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsers = void 0;
class GetUsers {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(query) {
        return this.userRepository.findAll(query);
    }
}
exports.GetUsers = GetUsers;
