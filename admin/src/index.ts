import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { INTERFACE_TYPE } from "./utils/appConst";
// import { IUserRepository } from "./interfaces/IUserRepository";
// import { UserRepository } from "./repositories/userRepository";
// import { IUserInteractor } from "./interfaces/IUserIntractor";
// import { UserInteractor } from "./intractors/userIntractor";
import cookieSession from "cookie-session";
import "./controllers/admin.controller";
import {
  KafkaConsumer,
  KafkaProducer,
  NotFoundError,
  errorHandler,
} from "@ezart/common";
import { IAdminRepository } from "./interfaces/IAdminRepository";
import { AdminRepository } from "./repositories/adminRepository";
import { IAdminInteractor } from "./interfaces/IAdminIntractor";
import { AdminInteractor } from "./intractors/adminIntractor";
import { dbConnect } from "./config/database";
import { UserCreatedConsumer } from "./events/consumer/user-created-consumer";

const container = new Container();

// container.bind<UserCreate>(UserCreate).toSelf();

container
  .bind<IAdminRepository>(INTERFACE_TYPE.AdminRepository)
  .to(AdminRepository);
container
  .bind<IAdminInteractor>(INTERFACE_TYPE.AdminInteractor)
  .to(AdminInteractor);
container.bind<UserCreatedConsumer>(UserCreatedConsumer).toSelf();
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
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const userCreatedConsumer =
  container.get<UserCreatedConsumer>(UserCreatedConsumer);
 userCreatedConsumer.listen().catch((err) => {
  console.error("Error starting user created consumer:", err);
}); 
