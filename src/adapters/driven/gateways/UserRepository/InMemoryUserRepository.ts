import { UserRepository } from '../../../../domain/gateways/UserRepository';
import { User } from '../../../../domain/models/User';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findAll() {
    return this.users;
  }

  feed(users: User[]) {
    this.users = users;
  }
}
