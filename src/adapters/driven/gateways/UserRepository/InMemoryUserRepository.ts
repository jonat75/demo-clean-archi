import { UserRepository } from '../../../../domain/gateways/UserRepository';
import { User } from '../../../../domain/models/User';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findAll() {
    return this.users;
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id) ?? null;
  }

  feed(users: User[]) {
    this.users = users;
  }
}
