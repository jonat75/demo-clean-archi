import { Controller, Get } from '@nestjs/common';
import { User } from '../../../domain/models/User';
import { InMemoryUserRepository } from '../../driven/gateways/UserRepository/InMemoryUserRepository';
import { RetrieveUsers } from '../../../domain/usecases/RetrieveUsers';

@Controller()
export class AppController {
  constructor() {}

  @Get('/users')
  async getUsers(): Promise<User[]> {
    const userRepo = new InMemoryUserRepository();
    const retrieveUsers = new RetrieveUsers(userRepo);
    return retrieveUsers.execute();
  }
}
