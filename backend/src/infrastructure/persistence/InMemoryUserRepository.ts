import { randomUUID } from "crypto";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findAll(filters?: { name?: string; email?: string }): Promise<User[]> {
    if (!filters?.name && !filters?.email) {
      return [...this.users];
    }

    return this.users.filter((user) => {
      const matchesName = filters.name
        ? user.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;

      const matchesEmail = filters.email
        ? user.email.toLowerCase().includes(filters.email.toLowerCase())
        : true;

      return matchesName && matchesEmail;
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === id);
    return user ?? null;
  }

  async create(data: Omit<User, "id">): Promise<User> {
    const user: User = {
      id: randomUUID(),
      ...data
    };

    this.users.push(user);
    return user;
  }

  async update(id: string, data: Omit<User, "id">): Promise<User | null> {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    const updatedUser: User = {
      id,
      ...data
    };

    this.users[index] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter((item) => item.id !== id);
    return this.users.length < initialLength;
  }
}
