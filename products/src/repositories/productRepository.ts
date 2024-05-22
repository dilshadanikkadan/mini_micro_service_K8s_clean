import { injectable } from "inversify";
import { User } from "../entities/user";
import { IProductRepository } from "../interfaces/IProductRepository";
import { Product } from "../entities/product";
import { ProductSerivces } from "../services/productService/productServices";
@injectable()
export class ProductRepository implements IProductRepository {
  async create(payload: Product): Promise<any> {
    const savedData = await ProductSerivces.build(payload);
    await savedData.save();
  }
}
