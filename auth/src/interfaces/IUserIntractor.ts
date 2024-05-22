export interface IUserInteractor {
    createUser(user: any): Promise<any>;
    allProducts(): Promise<any>;
  }
  