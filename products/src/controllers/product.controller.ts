import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IProductInteractor } from "../interfaces/IProductIntractor";
import { successMessage } from "../services/requestServices/successMessage";
import { Subjects, currentUser } from "@ezart/common";
import { UserCreate } from "../events/user-created";

@controller("/api/product")
export class ProductController {
  constructor(
    @inject(INTERFACE_TYPE.ProductInteractor)
    private interactor: IProductInteractor
  ) {}

  @httpGet("/currentUser", currentUser)
  async currentuser(req: Request, res: Response, next: NextFunction) {
    res.send({ currentUser: req.currentUser || null });
  }
  @httpPost("/create")
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      this.interactor.createProduct(req.body)
    } catch (error) {}
  }
}
