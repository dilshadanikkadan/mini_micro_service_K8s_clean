import { injectable } from "inversify";
import { User } from "../entities/user";
import { IUserRepository } from "../interfaces/IUserRepository";
import { SignupSerivces } from "../services/signupServices/signupService";
@injectable()
export class UserRepository implements IUserRepository {
  async create(payload: User): Promise<any> {
    const savingProcess = await SignupSerivces.build(payload);
    
    return savingProcess
  }
  async findAllProducts(data: any): Promise<any> {
      
  }
}
