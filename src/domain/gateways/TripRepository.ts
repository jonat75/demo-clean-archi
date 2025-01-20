import { Trip } from '../models/Trip';

export interface TripRepository {
  create(trip: Trip): Promise<void>;
}
