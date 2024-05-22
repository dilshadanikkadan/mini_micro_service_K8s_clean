import { Cart } from "../entities/cart";
import { Product } from "../entities/product";
import { User } from "../entities/user";

export interface ICartRepository {
  add(data: Cart): Promise<Cart>;
  create(data: Product): Promise<Product>;
  show(data:any):Promise <any>;
}
 