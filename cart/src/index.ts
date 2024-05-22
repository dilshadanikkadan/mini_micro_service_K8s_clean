import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { INTERFACE_TYPE } from "./utils/appConst";
import { ICartRepository } from "./interfaces/ICartRepository";
import { CartRepository } from "./repositories/CartRepository";
import { ICarttInteractor } from "./interfaces/ICartIntractor";
import { CartInteractor } from "./intractors/CartIntractor";
import cookieSession from "cookie-session";
import "./controllers/cart.controller";
import { dbConnect } from "./config/databseConnection";
import {
  KafkaConsumer,
  KafkaProducer,
  NotFoundError,
  errorHandler,
} from "@ezart/common";
import { Event, UserCreate } from "./events/user-created";
import { SubscribeAck } from "./events/acknowledgment/acknowledgment";
import { ProductCreateConsumer } from "./events/consumer/product.added";
import { CartAddingConsumer } from "./events/consumer/add.cart";
import { CartReqConsumer } from "./events/consumer/cart-request";

const container = new Container();

// container.bind<UserCreate>(UserCreate).toSelf();

container
  .bind<ICartRepository>(INTERFACE_TYPE.CartRepository)
  .to(CartRepository);
container
  .bind<ICarttInteractor>(INTERFACE_TYPE.CartInteractor)
  .to(CartInteractor);
container.bind<ProductCreateConsumer>(ProductCreateConsumer).toSelf();
container.bind<CartAddingConsumer>(CartAddingConsumer).toSelf();
container.bind<CartReqConsumer>(CartReqConsumer).toSelf();

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cookieSession({
      signed: false,
      secure: false,
    })
  );

  app.use(errorHandler);
});

const app = server.build();
dbConnect();
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const productCreateConsumer = container.get<ProductCreateConsumer>(
  ProductCreateConsumer
);
const addCartConsumemer = container.get<CartAddingConsumer>(CartAddingConsumer);
const CarFReqtConsumemer = container.get<CartReqConsumer>(CartReqConsumer);
productCreateConsumer.listen();

addCartConsumemer.listen().catch(console.error);
CarFReqtConsumemer.listen();