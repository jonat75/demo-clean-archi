import { TripRepository } from 'src/domain/gateways/TripRepository';
import { Trip } from 'src/domain/models/Trip';

export class InMemoryTripRepository implements TripRepository {
  private _trips: Trip[] = [];

  async create(trip: Trip) {
    this._trips.push(trip);
  }

  get trips() {
    return this._trips;
  }
}
