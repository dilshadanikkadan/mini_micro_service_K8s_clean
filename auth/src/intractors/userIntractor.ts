import { injectable, inject } from "inversify";
import { IUserInteractor } from "../interfaces/IUserIntractor";
import { IUserRepository } from "../interfaces/IUserRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { User } from "../entities/user";
import { SignupSerivces } from "../services/signupServices/signupService";
import { BadRequestError } from "@ezart/common";

@injectable()
export class UserInteractor implements IUserInteractor {
  constructor(
    @inject(INTERFACE_TYPE.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async createUser(user: User): Promise<any> {
    const isExistEmail = await SignupSerivces.emailAlreadyExist(user.email);

    if (isExistEmail)  throw new BadRequestError('Email Already Exist');

    return this.userRepository.create(user);
  }
   async allProducts(): Promise<any> {
      
  }
}
