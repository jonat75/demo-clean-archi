import { TripRepository } from '../gateways/TripRepository';
import { Trip } from '../models/Trip';

export class BookTrip {
  constructor(private tripRepository: TripRepository) {}
  async execute(trip: Trip) {
    this.tripRepository.create(trip);
  }
}
