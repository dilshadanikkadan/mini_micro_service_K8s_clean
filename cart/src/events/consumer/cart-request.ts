import { KafkaConsumer, Subjects } from "@ezart/common";
import { inject, injectable } from "inversify";
import { EachMessagePayload } from "kafkajs";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Consumer } from "kafkajs";
import { ICartRepository } from "../../interfaces/ICartRepository";
import { cartReqConsumer, consumer, productConsumer } from "../../config/kafaka.config";
import { ICarttInteractor } from "../../interfaces/ICartIntractor";
@injectable()
export class CartReqConsumer extends KafkaConsumer {
  subject: Subjects = Subjects.CartRequest;
  groupId = Subjects.CartRequest;

  constructor(
    @inject(INTERFACE_TYPE.CartInteractor)
    private CartIntractor: ICarttInteractor
  ) {
    super(cartReqConsumer);
  }
  async handleMessage(payload: EachMessagePayload): Promise<void> {
    if (payload.message.value) {
      const credentials = JSON.parse(payload.message.value.toString());
      console.log(
        `Received message on topic  ${this.subject}:`,
        credentials
      );
  
      this.CartIntractor.showCart(credentials)
     
    } else {
      console.error("Received message with undefined value");
    }
  } 
}
