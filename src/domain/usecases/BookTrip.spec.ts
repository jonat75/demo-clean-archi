import { InMemoryTripRepository } from '../../adapters/driven/gateways/TripRepository/InMemoryTripRepository';
import { Trip } from '../models/Trip';
import { User } from '../models/User';
import { BookTrip } from './BookTrip';

describe('bookTrip', () => {
  let tripRepository: InMemoryTripRepository;
  let bookTrip: BookTrip;

  let user: User;

  beforeEach(() => {
    tripRepository = new InMemoryTripRepository();
    bookTrip = new BookTrip(tripRepository);
    user = new User('John', new Date('2023/04/09'), '1');
  });

  it('should book a trip from outside to Paris', async () => {
    //Given
    const tripFromOutsideToParis = new Trip('Orléans', 'Paris', user);

    //When
    await bookTrip.execute(tripFromOutsideToParis);

    //Then
    expect(tripFromOutsideToParis.price).toEqual(0);
  });
  it('should book a trip from paris to outside', async () => {
    //Given
    const tripFromParisToOutside = new Trip('Paris', 'Orléans', user);

    //When
    await bookTrip.execute(tripFromParisToOutside);

    //Then
    expect(tripFromParisToOutside.price).toEqual(50);
  });
  it('should book a trip from paris to paris', async () => {
    //Given
    const tripFromParisToParis = new Trip('Paris', 'Paris', user);

    //When
    await bookTrip.execute(tripFromParisToParis);
    //Then
    expect(tripFromParisToParis.price).toEqual(30);
  });

  it('should pay half price if the taveler has less than one year of seniority', async () => {
    //Given
    const user1 = new User('John', new Date('2024/04/09'), '1');
    const tripFromParisToParis = new Trip('Paris', 'Paris', user1);
    //When
    await bookTrip.execute(tripFromParisToParis);

    //Then
    expect(tripFromParisToParis.price).toEqual(15);
  });
});
