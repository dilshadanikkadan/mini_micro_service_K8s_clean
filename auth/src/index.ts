import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { INTERFACE_TYPE } from "./utils/appConst";
import { IUserRepository } from "./interfaces/IUserRepository";
import { UserRepository } from "./repositories/userRepository";
import { IUserInteractor } from "./interfaces/IUserIntractor";
import { UserInteractor } from "./intractors/userIntractor";
import cookieSession from "cookie-session";
import "./controllers/user.controller";
import { dbConnect } from "./config/databseConnection";
import {
  KafkaConsumer,
  KafkaProducer,
  NotFoundError,
  errorHandler,
} from "@ezart/common";
import { Event, UserCreate } from "./events/user-created";
import { producer } from "./config/kafka.config";
import { SubscribeAck } from "./events/acknowledgment/acknowledgment";
import { CartResConsumer } from "./events/consumer/cart-response";

const container = new Container();

// container.bind<UserCreate>(UserCreate).toSelf();

container
  .bind<IUserRepository>(INTERFACE_TYPE.UserRepository)
  .to(UserRepository);
container
  .bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor)
  .to(UserInteractor);
container.bind<SubscribeAck>(SubscribeAck).toSelf();
const server = new InversifyExpressServer(container);
container.bind<CartResConsumer>(CartResConsumer).toSelf();

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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const cartResconsumer = container.get<CartResConsumer>(CartResConsumer);
cartResconsumer.listen();
