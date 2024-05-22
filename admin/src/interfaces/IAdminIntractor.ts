export interface IAdminInteractor {
    createProduct(user: any): Promise<any>;
    createUser(user: any): Promise<any>;
  }
  