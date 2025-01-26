import { InMemoryUserRepository } from '../../adapters/driven/gateways/UserRepository/InMemoryUserRepository';
import { RetrieveUsers } from './RetrieveUsers';

describe('retrieveUsers', () => {
  let retrieveUsers: RetrieveUsers;
  let userRepository: InMemoryUserRepository;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
    retrieveUsers = new RetrieveUsers(userRepository);
  });

  it('should return an empty array when there is no users', async () => {
    // Given
    const users = [];
    userRepository.feed(users);

    // When
    const retrievedUsers = await retrieveUsers.execute();

    // Then
    expect(retrievedUsers).toEqual(users);
  });

  it('should return an array with one user when there is one user', async () => {
    // Given
    const users = [{ name: 'John Doe', id: '1', createdAt: new Date() }];
    userRepository.feed(users);

    // When
    const retrievedUsers = await retrieveUsers.execute();

    // Then
    expect(retrievedUsers).toEqual(users);
  });

  it('should return an array with more than one user when there is more than one user', async () => {
    // Given
    const users = [
      { name: 'John Doe', id: '1', createdAt: new Date() },
      { name: 'Jane Doe', id: '2', createdAt: new Date() },
    ];
    userRepository.feed(users);

    // When
    const retrievedUsers = await retrieveUsers.execute();

    // Then
    expect(retrievedUsers).toEqual(users);
  });
});
