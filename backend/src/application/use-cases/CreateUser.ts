import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: { name: string; email: string }): Promise<User> {
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
