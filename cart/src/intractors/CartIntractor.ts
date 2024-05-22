import { injectable, inject } from "inversify";
import { ICarttInteractor } from "../interfaces/ICartIntractor";
import { ICartRepository } from "../interfaces/ICartRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { User } from "../entities/user";
import { BadRequestError } from "@ezart/common";
import { Product } from "../entities/product";

@injectable()
export class CartInteractor implements ICarttInteractor {
  constructor(
    @inject(INTERFACE_TYPE.CartRepository)
    private cartRepository: ICartRepository
  ) {}

  async addToCart(data: any): Promise<any> {
    return await this.cartRepository.add(data);
  }
  async showCart(userId: any): Promise<any> {
      return await this.cartRepository.show(userId)
  }
}
