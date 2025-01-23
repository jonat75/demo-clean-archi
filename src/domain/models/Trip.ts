import { User } from './User';

export class Trip {
  private _price: number;
  constructor(
    private from: string,
    private to: string,
    private user: User,
    private id?: string,
  ) {
    this.id = id ?? crypto.randomUUID();
    this._price = this.calculatePrice();
  }

  public get price(): number {
    return this._price;
  }

  calculatePrice(): number {
    let price = 0;

    const isFromParisToOutside = this.from === 'Paris' && this.to !== 'Paris';
    const isFromParisToParis = this.from === 'Paris' && this.to === 'Paris';

    if (isFromParisToOutside) price = 50;
    if (isFromParisToParis) price = 30;

    if (this.isUserYoungThanOneYear()) return price / 2;

    return price;
  }

  isUserYoungThanOneYear(): boolean {
    const currentDate = new Date();
    const userSeniority = currentDate.getTime() - this.user.createdAt.getTime();
    return Math.floor(userSeniority / (1000 * 60 * 60 * 24 * 365)) < 1;
  }
}
