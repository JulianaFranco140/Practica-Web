import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, input: { name: string; email: string }): Promise<User | null> {
    if (!id) {
      throw new Error("El id es obligatorio");
    }

    if (!input.name?.trim()) {
      throw new Error("El nombre es obligatorio");
    }

    if (!input.email?.trim()) {
      throw new Error("El email es obligatorio");
    }

    const usersWithSameEmail = await this.userRepository.findAll({ email: input.email.trim() });
    const repeatedEmail = usersWithSameEmail.some((user) => user.id !== id);

    if (repeatedEmail) {
      throw new Error("Ya existe un usuario con ese email");
    }

    return this.userRepository.update(id, {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase()
    });
  }
}
