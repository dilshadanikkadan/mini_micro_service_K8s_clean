import { injectable, inject } from "inversify";
import { IAdminInteractor } from "../interfaces/IAdminIntractor";
import { IAdminRepository } from "../interfaces/IAdminRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
// import { SignupSerivces } from "../services/signupServices/signupService";
import { BadRequestError } from "@ezart/common";
import { Product } from "../entities/product";
import { User } from "../entities/user";
import { SignupSerivces } from "../services/signupServices/signupService";

@injectable()
export class AdminInteractor implements IAdminInteractor {
  constructor(
    @inject(INTERFACE_TYPE.AdminRepository)
    private adminRepository: IAdminRepository
  ) {}

  async createProduct(product: Product): Promise<any> {
    return this.adminRepository.create(product);
  }

  async createUser(user: User): Promise<any> {
    console.log(user);
    // const isExistEmail = await SignupSerivces.emailAlreadyExist(user.email);

    // if (isExistEmail) throw new BadRequestError("Email Already Exist");

    return this.adminRepository.build(user);
  }
}
