import { Product } from "../entities/product";
import { User } from "../entities/user";

export interface IAdminRepository {
  create(data: Product): Promise<Product>;
  build(data: User): Promise<User>;
}
