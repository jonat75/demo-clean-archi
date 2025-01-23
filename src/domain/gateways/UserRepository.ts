import { User } from '../models/User';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findUserById(userId: string): Promise<User | null>;
}
