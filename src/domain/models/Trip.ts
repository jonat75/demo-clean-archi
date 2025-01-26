export interface TripProps {
  from: string;
  to: string;
  userId: string;
  userCreationDate: Date;
  id: string;
  createdAt: Date;
}

export class Trip {
  private from: string;
  private to: string;
  private userId: string;
  private price: number;
  private id: string;
  private userCreationDate: Date;
  private createdAt: Date;
  constructor(props: TripProps) {
    this.from = props.from;
    this.to = props.to;
    this.userId = props.userId;
    this.id = props.id;
    this.userCreationDate = props.userCreationDate;
    this.createdAt = props.createdAt;
    this.price = this.calculatePrice();
  }

  calculatePrice(): number {
    const isUserAccountOlderThanOneYear =
      Math.abs(this.createdAt?.getTime() - this.userCreationDate?.getTime()) >
      365 * 24 * 60 * 60 * 1000;

    let price = 0;

    const isFromParisToOutside = this.from === 'Paris' && this.to !== 'Paris';
    const isFromParisToParis = this.from === 'Paris' && this.to === 'Paris';

    if (isFromParisToOutside) price = 50;
    if (isFromParisToParis) price = 30;

    if (isUserAccountOlderThanOneYear) return price / 2;
    return price;
  }
}
