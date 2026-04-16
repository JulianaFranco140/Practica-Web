import { UserRepository } from "../../domain/repositories/UserRepository";

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<boolean> {
    if (!id) {
      throw new Error("El id es obligatorio");
    }

    return this.userRepository.delete(id);
  }
}
