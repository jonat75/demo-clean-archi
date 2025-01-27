import { InMemoryTripRepository } from '../../adapters/driven/gateways/TripRepository/InMemoryTripRepository';
import { InMemoryUserRepository } from '../../adapters/driven/gateways/UserRepository/InMemoryUserRepository';
import { BookTrip, DateGenerator, UuidGenerator } from './BookTrip';

class FakeUuidGenerator implements UuidGenerator {
  private _nextUuid: string;
  async generate() {
    return this._nextUuid;
  }
  set nextUuid(uuid: string) {
    this._nextUuid = uuid;
  }
}

class FakeDateGenerator implements DateGenerator {
  private _date: Date;
  async generate() {
    return this._date;
  }
  set date(date: Date) {
    this._date = date;
  }
}

describe('bookTrip', () => {
  let tripRepository: InMemoryTripRepository;
  let userRepository: InMemoryUserRepository;
  let bookTrip: BookTrip;
  let uuidGenerator: FakeUuidGenerator;
  let dateGenerator: FakeDateGenerator;

  beforeEach(() => {
    tripRepository = new InMemoryTripRepository();
    userRepository = new InMemoryUserRepository();
    uuidGenerator = new FakeUuidGenerator();
    dateGenerator = new FakeDateGenerator();
    bookTrip = new BookTrip(
      tripRepository,
      userRepository,
      uuidGenerator,
      dateGenerator,
    );
  });

  it('should book a trip from outside to Paris', async () => {
    //Given
    const tripParam = {
      from: 'Orléans',
      to: 'Paris',
      userId: '1',
      userCreationDate: new Date(),
      id: 'id-1',
      createdAt: new Date(),
    };
    uuidGenerator.nextUuid = tripParam.id;
    dateGenerator.date = tripParam.createdAt;
    userRepository.feed([
      {
        id: tripParam.userId,
        name: 'Toto',
        createdAt: tripParam.userCreationDate,
      },
    ]);
    //When
    await bookTrip.execute(tripParam.from, tripParam.to, tripParam.userId);
    //Then
    expect(tripRepository.trips).toEqual([{ price: 0, ...tripParam }]);
  });

  it('should book a trip from paris to outside', async () => {
    //Given
    const tripParam = {
      from: 'Paris',
      to: 'Orléans',
      userId: '1',
      userCreationDate: new Date(),
      id: 'id-2',
      createdAt: new Date(),
    };
    uuidGenerator.nextUuid = tripParam.id;
    dateGenerator.date = tripParam.createdAt;
    userRepository.feed([
      {
        id: tripParam.userId,
        name: 'Toto',
        createdAt: tripParam.userCreationDate,
      },
    ]);

    //When
    await bookTrip.execute(tripParam.from, tripParam.to, tripParam.userId);
    //Then
    expect(tripRepository.trips).toEqual([{ price: 50, ...tripParam }]);
  });

  it('should book a trip from paris to paris', async () => {
    //Given
    const tripParam = {
      from: 'Paris',
      to: 'Paris',
      userId: '1',
      userCreationDate: new Date(),
      id: 'id-3',
      createdAt: new Date(),
    };
    uuidGenerator.nextUuid = tripParam.id;
    dateGenerator.date = tripParam.createdAt;
    userRepository.feed([
      {
        id: tripParam.userId,
        name: 'Toto',
        createdAt: tripParam.userCreationDate,
      },
    ]);

    //When
    await bookTrip.execute(tripParam.from, tripParam.to, tripParam.userId);
    //Then
    expect(tripRepository.trips).toEqual([{ price: 30, ...tripParam }]);
  });

  it('should pay half price if user registered more than a year ago', async () => {
    //Given
    const tripParam = {
      from: 'Paris',
      to: 'Paris',
      userId: '1',
      userCreationDate: new Date('2022-01-01'),
      id: 'id-3',
      createdAt: new Date(),
    };
    uuidGenerator.nextUuid = tripParam.id;
    dateGenerator.date = tripParam.createdAt;
    userRepository.feed([
      {
        id: tripParam.userId,
        name: 'Toto',
        createdAt: tripParam.userCreationDate,
      },
    ]);

    //When
    await bookTrip.execute(tripParam.from, tripParam.to, tripParam.userId);
    //Then
    expect(tripRepository.trips).toEqual([{ price: 15, ...tripParam }]);
  });
});
