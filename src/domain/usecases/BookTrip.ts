import { TripRepository } from '../gateways/TripRepository';
import { Trip } from '../models/Trip';

export interface UuidGenerator {
  generate(): Promise<string>;
}

export class BookTrip {
  constructor(
    private tripRepository: TripRepository,
    private uuidGenerator: UuidGenerator,
  ) {}
  async execute(from, to, userId) {
    const trip = new Trip({
      from,
      to,
      userId,
      id: await this.uuidGenerator.generate(),
    });

    this.tripRepository.create(trip);
  }
}
