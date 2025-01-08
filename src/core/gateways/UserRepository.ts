import { User } from '../models/User';

export interface UserRepository {
  findAll(): Promise<User[]>;
}
