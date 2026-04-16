import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class GetUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    if (!id) {
      throw new Error("El id es obligatorio");
    }

    return this.userRepository.findById(id);
  }
}
