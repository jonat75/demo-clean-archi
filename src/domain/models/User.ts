export class User {
  constructor(
    private name: string,
    private _createdAt: Date,
    private _id?: string,
  ) {
    this._id = _id ?? crypto.randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  getUserData() {
    const user = {
      name: this.name,
      createdAt: this._createdAt,
      id: this._id,
    };

    return user;
  }
}
