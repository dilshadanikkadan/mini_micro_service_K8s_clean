import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  category: string;
}

export const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
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

ProductSchema.pre("save", function (done) {
  if (this.price < 0) {
    throw new Error("Price must be positive");
  }
  done();
});

export const ProductModel = model<IProduct>("Product", ProductSchema);
