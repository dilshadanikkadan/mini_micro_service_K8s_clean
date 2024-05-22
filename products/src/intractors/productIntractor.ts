import { injectable, inject } from "inversify";
import { IProductInteractor } from "../interfaces/IProductIntractor";
import { IProductRepository } from "../interfaces/IProductRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { User } from "../entities/user";
import { BadRequestError } from "@ezart/common";
import { Product } from "../entities/product";

@injectable()
export class ProductInteractor implements IProductInteractor {
  constructor(
    @inject(INTERFACE_TYPE.ProductRepository)
    private productRepository: IProductRepository
  ) {}

  async createProduct(product: Product): Promise<any> {
    this.productRepository.create(product)
  }
}
