import { UserRepository } from '../../../../domain/gateways/UserRepository';
import { User } from '../../../../domain/models/User';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async addNewUser(user: User): Promise<void> {
    this.users.push(user);
  }

  async findUserById(userId: string): Promise<User | null> {
    const userById = this.users.filter((user) => user.id === userId);
    if (userById.length === 0) return null;
    return userById[0];
  }
}
