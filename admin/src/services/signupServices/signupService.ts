import { User } from "../../entities/user";
import { IUser, UserModel, UserSchema } from "../../models/user.model";

export class SignupSerivces {
  static async emailAlreadyExist(email: string) {
    const res = await UserModel.find({email});
    return res.length !== 0;
  }

  static async build(attrs: User) {
    return new UserModel(attrs);
  }
}
