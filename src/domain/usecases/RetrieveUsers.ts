import { UserRepository } from '../gateways/UserRepository';
import { User } from '../models/User';

export class RetrieveUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
