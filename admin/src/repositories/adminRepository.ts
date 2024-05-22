import { injectable } from "inversify";
import { IAdminRepository } from "../interfaces/IAdminRepository";
// import { SignupSerivces } from "../services/signupServices/signupService";
import { Product } from "../entities/product";
import { User } from "../entities/user";
import { SignupSerivces } from "../services/signupServices/signupService";
import { ProductSerivces } from "../services/productService/productServices";
@injectable()
export class AdminRepository implements IAdminRepository {
  async create(payload: Product): Promise<any> {
    const savedData = await ProductSerivces.build(payload);
    const res = await savedData.save();

    return res;
  }
  async build(payload: User): Promise<any> {
    const savingProcess = await SignupSerivces.build(payload);
    await savingProcess.save();
    return savingProcess;
  }
}
