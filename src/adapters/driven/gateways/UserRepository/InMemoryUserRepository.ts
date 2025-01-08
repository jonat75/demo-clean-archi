import { UserRepository } from '../../../../core/gateways/UserRepository';
import { User } from '../../../../core/models/User';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findAll() {
    return this.users;
  }

  feed(users: User[]) {
    this.users = users;
  }
}
