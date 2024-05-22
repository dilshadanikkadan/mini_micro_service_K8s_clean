export class User {
    constructor(
      public readonly username: string,
      public readonly email: string,
      public readonly isAdmin: boolean,
      public readonly _id: any
    ) {}
  }
   