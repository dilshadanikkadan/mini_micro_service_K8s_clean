import { KafkaConsumer, Subjects } from "@ezart/common";
import { inject, injectable } from "inversify";
import { EachMessagePayload } from "kafkajs";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Consumer } from "kafkajs";
import { IUserInteractor } from "../../interfaces/IUserIntractor";
import { CartResconsumer } from "../../config/kafka.config";
import EventEmitter from 'events';
import util from 'util';

@injectable()
export class CartResConsumer extends KafkaConsumer {
  subject: Subjects = Subjects.CartResponse;
  groupId = Subjects.CartResponse;
  public eventEmitter = new EventEmitter();

  constructor(
    @inject(INTERFACE_TYPE.UserInteractor)
    private CartIntractor: IUserInteractor
  ) {
    super(CartResconsumer);
  }

  async handleMessage(payload: EachMessagePayload): Promise<void> {
    console.log("Message received by consumer");
    if (payload.message.value) {
      const credentials = JSON.parse(payload.message.value.toString());
      console.log(
        "cartResponse",
        util.inspect(credentials, { depth: null, colors: true })
      );
      this.eventEmitter.emit('cartResponse', credentials);
    } else {
      console.error("Received message with undefined value");
    }
  }
}
