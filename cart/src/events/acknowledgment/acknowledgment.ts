import { KafkaConsumer, Subjects } from "@ezart/common";
import { EachMessagePayload } from "kafkajs";

export class SubscribeAck extends KafkaConsumer {
  subject: Subjects = Subjects.acknowledgmentUserCreated;
  groupId = Subjects.acknowledgmentUserCreated;

  async handleMessage(payload: EachMessagePayload): Promise<void> {
    console.log("actually we entring here dilshad");
    
    if (payload.message.value) {
      console.log(payload);

      const credentials = JSON.parse(payload.message.value.toString());
      console.log(`Received message on topic ${this.subject}:`, credentials);
    } else {
      console.error("Received message with undefined value");
    }
  }
}
