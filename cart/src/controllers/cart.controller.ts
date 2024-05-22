import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { INTERFACE_TYPE } from "../utils/appConst";
import { ICarttInteractor } from "../interfaces/ICartIntractor";
import { successMessage } from "../services/requestServices/successMessage";
import { Subjects, currentUser } from "@ezart/common";
import { UserCreate } from "../events/user-created";

@controller("/api/cart")
export class CartController {
  constructor(
    @inject(INTERFACE_TYPE.CartInteractor)
    private interactor: ICarttInteractor
  ) {}

  @httpGet("/currentUser", currentUser)
  async currentuser(req: Request, res: Response, next: NextFunction) {
    res.send({ currentUser: req.currentUser || null }); 
  }
  @httpPost("/addToCart", currentUser)
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.currentUser); 

      // this.interactor.addToCart(req.body)
    } catch (error) {}
  } 
}
