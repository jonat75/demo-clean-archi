import { TripRepository } from '../gateways/TripRepository';
import { UserRepository } from '../gateways/UserRepository';
import { Trip } from '../models/Trip';

export interface UuidGenerator {
  generate(): Promise<string>;
}

export class BookTrip {
  constructor(
    private tripRepository: TripRepository,
    private userRepository: UserRepository,
    private uuidGenerator: UuidGenerator,
  ) {}
  async execute(from, to, userId) {
    const user = await this.userRepository.findById(userId);

    const trip = new Trip({
      from,
      to,
      userId,
      id: await this.uuidGenerator.generate(),
      userCreationDate: user.createdAt,
      createdAt: new Date(),
    });

    this.tripRepository.create(trip);
  }
}
