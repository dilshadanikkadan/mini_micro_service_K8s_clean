import { Product } from "../entities/product";
import { User } from "../entities/user";

export interface IProductRepository {
  create(data: Product): Promise<Product>;
}
 