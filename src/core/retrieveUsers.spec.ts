interface User {
  name: string;
}

interface UserRepository {
  findAll(): Promise<User[]>;
}

class RetrieveUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}

class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findAll() {
    return this.users;
  }

  feed(users: User[]) {
    this.users = users;
  }
}

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
    const users = [{ name: 'John Doe' }];
    userRepository.feed(users);

    // When
    const retrievedUsers = await retrieveUsers.execute();

    // Then
    expect(retrievedUsers).toEqual(users);
  });

  it('should return an array with one user when there is more than one user', async () => {
    // Given
    const users = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
    userRepository.feed(users);

    // When
    const retrievedUsers = await retrieveUsers.execute();

    // Then
    expect(retrievedUsers).toEqual(users);
  });
});
