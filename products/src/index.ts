import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { INTERFACE_TYPE } from "./utils/appConst";
import { IProductRepository } from "./interfaces/IProductRepository";
import { ProductRepository } from "./repositories/productRepository";
import { IProductInteractor } from "./interfaces/IProductIntractor";
import { ProductInteractor } from "./intractors/productIntractor";
import cookieSession from "cookie-session";
import "./controllers/product.controller";
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

const container = new Container();

// container.bind<UserCreate>(UserCreate).toSelf();

container
  .bind<IProductRepository>(INTERFACE_TYPE.ProductRepository)
  .to(ProductRepository);
container
  .bind<IProductInteractor>(INTERFACE_TYPE.ProductInteractor)
  .to(ProductInteractor);
container.bind<ProductCreateConsumer>(ProductCreateConsumer).toSelf();

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
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const productCreateConsumer = container.get<ProductCreateConsumer>(
  ProductCreateConsumer
);
productCreateConsumer.listen().catch((err) => {
  console.error("Error starting user created consumer:", err);
});
