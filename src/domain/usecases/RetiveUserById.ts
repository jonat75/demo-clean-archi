import { UserRepository } from '../gateways/UserRepository';
import { User } from '../models/User';

export default class RetriveUserById {
  constructor(private userRepository: UserRepository) {}
  execute(userId: string): Promise<User | null> {
    return this.userRepository.findUserById(userId);
  }
}
