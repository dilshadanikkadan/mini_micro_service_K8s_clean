import { CartModel } from "../../models/cart..model";

export class CartSerivces {
  static async build(attrs: any) {
    return new CartModel(attrs);
  }
  static async userAlreadyExist(userId: any) {
    const res = await CartModel.find({ userId });
    return res.length === 0;
  }

  static async pushCart(userId: any, productData: any) {
    return await CartModel.findOneAndUpdate(
      { userId: userId },
      { $push: { items: productData } }
    );
  }
}
