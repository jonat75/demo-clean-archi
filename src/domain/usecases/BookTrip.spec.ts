import { InMemoryTripRepository } from '../../adapters/driven/gateways/TripRepository/InMemoryTripRepository';
import { BookTrip, UuidGenerator } from './BookTrip';

class FakeUuidGenerator implements UuidGenerator {
  private _nextUuid: string;
  async generate() {
    return this._nextUuid;
  }
  set nextUuid(uuid: string) {
    this._nextUuid = uuid;
  }
}

describe('bookTrip', () => {
  let tripRepository: InMemoryTripRepository;
  let bookTrip: BookTrip;
  let uuidGenerator: FakeUuidGenerator;

  beforeEach(() => {
    tripRepository = new InMemoryTripRepository();
    uuidGenerator = new FakeUuidGenerator();
    bookTrip = new BookTrip(tripRepository, uuidGenerator);
  });

  it('should book a trip from outside to Paris', async () => {
    //Given
    const tripParam = {
      from: 'Orléans',
      to: 'Paris',
      userId: '1',
      id: 'id-1',
    };
    uuidGenerator.nextUuid = tripParam.id;
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
      id: 'id-2',
    };
    uuidGenerator.nextUuid = tripParam.id;

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
      id: 'id-3',
    };
    uuidGenerator.nextUuid = tripParam.id;

    //When
    await bookTrip.execute(tripParam.from, tripParam.to, tripParam.userId);
    //Then
    expect(tripRepository.trips).toEqual([{ price: 30, ...tripParam }]);
  });

  // it('should pay half price if user registered more than a year ago', async () => {});
});
