import { TripRepository } from '../gateways/TripRepository';
import { UserRepository } from '../gateways/UserRepository';
import { Trip } from '../models/Trip';

export interface UuidGenerator {
  generate(): Promise<string>;
}
export interface DateGenerator {
  generate(): Promise<Date>;
}
export class BookTrip {
  constructor(
    private tripRepository: TripRepository,
    private userRepository: UserRepository,
    private uuidGenerator: UuidGenerator,
    private dateGenerator: DateGenerator,
  ) {}
  async execute(from, to, userId) {
    const user = await this.userRepository.findById(userId);

    const trip = new Trip({
      from,
      to,
      userId,
      id: await this.uuidGenerator.generate(),
      userCreationDate: user.createdAt,
      createdAt: await this.dateGenerator.generate(),
    });

    this.tripRepository.create(trip);
  }
}
