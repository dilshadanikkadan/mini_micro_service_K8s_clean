export interface ICarttInteractor {
    addToCart(user: any): Promise<any>;
    showCart(user:any):Promise<any>;
  }
  