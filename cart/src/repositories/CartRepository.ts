import { injectable } from "inversify";
import { User } from "../entities/user";
import { ICartRepository } from "../interfaces/ICartRepository";
import { Product } from "../entities/product";
import { ProductSerivces } from "../services/productService/productServices";
import { Cart } from "../entities/cart";
import { CartModel } from "../models/cart..model";
import { CartSerivces } from "../services/cartService/cartServices";
import { CartReposnse } from "../events/producer/cart-response";
import { producer } from "../config/kafaka.config";
import { Subjects } from "@ezart/common";
import util from "util";
@injectable()
export class CartRepository implements ICartRepository {
  async add(payload: any): Promise<any> {
    const data = {
      userId: payload.userId,
      items: [{ productId: payload.productData.productId }],
      quantity: 1,
    };
    console.log("payload from repo", data);
    const userExist = await CartSerivces.userAlreadyExist(payload.userId);
    if (userExist) {
      const savedCart = await CartSerivces.build(data);
      await savedCart.save();
    } else {
      const productData = {
        productId: payload.productData.productId,
      };
      const userId = payload.userId;
      return await CartSerivces.pushCart(userId, productData);
    }
  }
  async create(payload: Product): Promise<any> {
    const savedData = await ProductSerivces.build(payload);
    await savedData.save();
  }
  async show(userId: any): Promise<any> {
    const id = userId.payload;

    const queryResCart = await CartModel.findOne({ userId: id }).populate(
      "items.productId"
    );
    const cartResponse = new CartReposnse(producer);
    console.log(
      "cartResponse",
      util.inspect(queryResCart, { depth: null, colors: true })
    );
 
    await cartResponse.produce(
      { payload: queryResCart },
      Subjects.CartResponse
    );
  }
}
