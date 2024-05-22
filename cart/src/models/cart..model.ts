import { Schema, model, Document, Types } from "mongoose";

export interface ICartItem {
  productId: Types.ObjectId;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
}

export const CartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    _id: false,
  }
);

export const CartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [CartItemSchema], required: true, default: [] },
    totalPrice: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export const CartModel = model<ICart>("Cart", CartSchema);
