import { Kafka, Producer, Consumer } from "kafkajs";

export const kafka = new Kafka({
  clientId: "auth-service",
  brokers: ["localhost:9092"],
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({ groupId: "auth-service" });
export const CartResconsumer: Consumer = kafka.consumer({ groupId: "cart-res-service" });

