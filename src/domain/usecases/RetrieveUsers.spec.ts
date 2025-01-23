import { RetrieveUsers } from './RetrieveUsers';
import { InMemoryUserRepository } from '../../adapters/driven/gateways/UserRepository/InMemoryUserRepository';
import { User } from '../models/User';
import RetriveUserById from './RetiveUserById';

describe('retrieveUsers', () => {
  let retrieveUsers: RetrieveUsers;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    retrieveUsers = new RetrieveUsers(userRepository);
  });

  it('should return an empty array when there is no users', async () => {
    // Given
    const users: User[] = [];

    // When
    const retrievedUsers = await retrieveUsers.execute();

    // Then
    expect(retrievedUsers).toEqual(users);
  });

  it('should return an array with one user when there is one user', async () => {
    // Given

    const user: User = new User('John', new Date(), '1');
    userRepository.addNewUser(user);

    // When
    const retrievedUser = await retrieveUsers.execute();

    // Then
    expect(retrievedUser).toEqual([user]);
  });

  it('should retrive user by id', async () => {
    // Given
    const user: User = new User('John', new Date(), '123');
    userRepository.addNewUser(user);

    // When
    const retriveUserById = new RetriveUserById(userRepository);
    const retrievedUser: User = await retriveUserById.execute('123');

    // Then
    expect(retrievedUser.id).toEqual('123');
  });

  it('should return null if user does not exist', async () => {
    // Given
    const user: User = new User('John', new Date(), '123');
    userRepository.addNewUser(user);

    // When
    const retriveUserById = new RetriveUserById(userRepository);
    const retrievedUser: User = await retriveUserById.execute('000');

    // Then
    expect(retrievedUser).toEqual(null);
  });
});
