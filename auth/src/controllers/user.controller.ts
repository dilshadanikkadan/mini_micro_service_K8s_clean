import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IUserInteractor } from "../interfaces/IUserIntractor";
import { successMessage } from "../services/requestServices/successMessage";
import { accessToken } from "../services/jwtServices/accessToken";
import { Subjects, currentUser } from "@ezart/common";
import { UserCreate } from "../events/user-created";
import { producer } from "../config/kafka.config";
import { User } from "../entities/user";
import { addCartProducer } from "../events/producer/add-to-cart";
import { CartReqProducer } from "../events/producer/cart-request";
import { CartResConsumer } from "../events/consumer/cart-response";

@controller("/api/auth")
export class UserController {
  constructor(
    @inject(INTERFACE_TYPE.UserInteractor) private interactor: IUserInteractor,
    @inject(CartResConsumer) private cartResConsumer: CartResConsumer
  ) {}

  @httpGet("/currentUser", currentUser)
  async currentuser(req: Request, res: Response, next: NextFunction) {
    res.send({ currentUser: req.currentUser || null });
  }

  @httpPost("/create")
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const credential: User = req.body;
      const user = await this.interactor.createUser(credential);
      const userCreate = new UserCreate(producer);
      await user.save();
      const token = accessToken(user);
      req.session = {
        jwt: token,
      };
      await userCreate.produce({ payload: user }, Subjects.TestTopic);

      return successMessage(res, 201, {
        paylaod: user,
        token,
      });
    } catch (error: any) {
      res.status(500).json(error?.message);
    }
  }

  @httpGet("/products")
  async allProducts(req: Request, res: Response, next: NextFunction) {
    try {
      res.send("hey dilu")
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/addToCart", currentUser)
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const addToCart = new addCartProducer(producer);
      await addToCart.produce(
        {
          payload,
          userId: req.currentUser?.id,
        },
        Subjects.cartAdded
      );
      successMessage(res, 200, "Successfully added to cart!!");
    } catch (error) {
      next(error);
    }
  }

  @httpGet("/showCart/:id")
  async showCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params?.id;
      const cartReq = new CartReqProducer(producer);
      await cartReq.produce({ payload: userId }, Subjects.CartRequest);
      console.log(`Produced CartRequest for userId: ${userId}`);

      const cartResponse = await new Promise((resolve, reject) => {
        console.log("Entered event listener");
        
        this.cartResConsumer.eventEmitter.once("cartResponse", (data) => {
          console.log("Received cartResponse:", data);
          resolve(data);
        });

        setTimeout(() => {
          console.error("Timeout waiting for cart response");
          reject(new Error("Timeout waiting for cart response"));
        }, 80000); 
      });

      res.json(cartResponse);
    } catch (error: any) {
      console.error("Error showing cart:", error);
      res.status(500).send(error.message);
    }
  }
}
