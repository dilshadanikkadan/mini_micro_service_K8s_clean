export class User {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: number,
    public readonly isAdmin: boolean
  ) {}
}
 