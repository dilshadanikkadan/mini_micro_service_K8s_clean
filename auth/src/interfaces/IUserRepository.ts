import { User } from "../entities/user";

export interface IUserRepository {
  create(data: User): Promise<User>;
  findAllProducts(data:any):Promise<any>;
}
 