export interface TripProps {
  from: string;
  to: string;
  userId: string;
  id: string;
}
export type TripState = TripProps & {
  price: number;
};

export class Trip {
  private from: string;
  private to: string;
  private userId: string;
  private price: number;
  private id: string;
  constructor(props: TripProps) {
    this.from = props.from;
    this.to = props.to;
    this.userId = props.userId;
    this.price = this.calculatePrice();
    this.id = props.id;
  }

  calculatePrice(): number {
    let price = 0;

    const isFromParisToOutside = this.from === 'Paris' && this.to !== 'Paris';
    const isFromParisToParis = this.from === 'Paris' && this.to === 'Paris';

    if (isFromParisToOutside) price = 50;
    if (isFromParisToParis) price = 30;
    return price;
  }
}
