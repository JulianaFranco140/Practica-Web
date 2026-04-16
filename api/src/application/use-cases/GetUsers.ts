import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class GetUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query?: { name?: string; email?: string }): Promise<User[]> {
    return this.userRepository.findAll(query);
  }
}
