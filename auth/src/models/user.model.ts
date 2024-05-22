import { Schema, model, Document } from "mongoose";
import { PasswordServices } from "../services/passwordServices/passwordServices";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordServices.hash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export const UserModel = model<IUser>("User", UserSchema);
