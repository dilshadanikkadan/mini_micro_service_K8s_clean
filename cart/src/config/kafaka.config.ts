import { Kafka, Producer, Consumer } from "kafkajs";

export const kafka = new Kafka({
  clientId: "cart-service",
  brokers: ["localhost:9092"],
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({ groupId: "cart-service" });
export const productConsumer: Consumer = kafka.consumer({ groupId: "cart-service-product-group" });
export const cartReqConsumer: Consumer = kafka.consumer({ groupId: "cart-consumer-group" });
