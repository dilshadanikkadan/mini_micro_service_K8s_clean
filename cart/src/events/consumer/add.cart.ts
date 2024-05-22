import { KafkaConsumer, Subjects } from "@ezart/common";
import { inject, injectable } from "inversify";
import { EachMessagePayload } from "kafkajs";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Consumer } from "kafkajs";
import { ICartRepository } from "../../interfaces/ICartRepository";
import { consumer, productConsumer } from "../../config/kafaka.config";
import { ICarttInteractor } from "../../interfaces/ICartIntractor";
@injectable()
export class CartAddingConsumer extends KafkaConsumer {
  subject: Subjects = Subjects.cartAdded;
  groupId = Subjects.cartAdded;

  constructor(
    @inject(INTERFACE_TYPE.CartInteractor)
    private CartIntractor: ICarttInteractor
  ) {
    super(productConsumer);
  }
  async handleMessage(payload: EachMessagePayload): Promise<void> {
    if (payload.message.value) {
      const credentials = JSON.parse(payload.message.value.toString());
      console.log(
        `Received message on topic new ${this.subject}:`,
        credentials
      );
      await this.CartIntractor.addToCart({
        productData: credentials.payload,
        userId: credentials.userId,
      });
    } else {
      console.error("Received message with undefined value");
    }
  }
}
