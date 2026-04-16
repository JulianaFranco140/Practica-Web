import { User } from "../entities/User";

export interface UserRepository {
  findAll(filters?: { name?: string; email?: string }): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(data: Omit<User, "id">): Promise<User>;
  update(id: string, data: Omit<User, "id">): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
