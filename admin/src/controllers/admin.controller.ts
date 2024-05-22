import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { INTERFACE_TYPE } from "../utils/appConst";

import { Subjects, currentUser } from "@ezart/common";
import { IAdminInteractor } from "../interfaces/IAdminIntractor";
import { accessToken } from "../services/jwtServices/accessToken";
import { successMessage } from "../services/requestServices/successMessage";
import { ProductCreate } from "../events/producer/add.products";
import { producer } from "../config/kafaka.config";

@controller("/api/admin")
export class AdminController {
  constructor(
    @inject(INTERFACE_TYPE.AdminInteractor) private interactor: IAdminInteractor
  ) {}

  @httpPost("/addUser")
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const credential = req.body;
      const user = await this.interactor.createUser(credential);
      // const userCreate = new UserCreate();
      await user.save();
      const token = accessToken(user);
      req.session = {
        jwt: token,
      };
      return successMessage(res, 201, {
        paylaod: user,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @httpPost("/addProduct")
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const productCreate = new ProductCreate(producer);
      const savedProduct =await this.interactor.createProduct(payload)
      console.log(savedProduct);
      await productCreate.produce({ payload:savedProduct }, Subjects.ProductAdded);
    } catch (error) {}
  }
}
