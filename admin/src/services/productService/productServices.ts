import { Product } from "../../entities/product";
import { ProductModel } from "../../models/product.model";

export class ProductSerivces {
  static async build(attrs: Product) {
    return new ProductModel(attrs);
  }
}
