import { KafkaConsumer, Subjects } from "@ezart/common";
import { inject, injectable } from "inversify";
import { EachMessagePayload } from "kafkajs";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { Consumer } from "kafkajs";
import { IProductRepository } from "../../interfaces/IProductRepository";
import { consumer } from "../../config/kafaka.config";
@injectable()
export class ProductCreateConsumer extends KafkaConsumer {
  subject: Subjects = Subjects.ProductAdded;
  groupId = Subjects.ProductAdded;

  constructor(
    @inject(INTERFACE_TYPE.ProductRepository)
    private adminRepository: IProductRepository
  ) {
    super(consumer);
  }
  async handleMessage(payload: EachMessagePayload): Promise<void> {
    if (payload.message.value) {
      const credentials = JSON.parse(payload.message.value.toString());
      console.log(`Received message on topic ${this.subject}:`, credentials);
      const { title, category, description, price,_id } = credentials.payload;
      await this.adminRepository.create({
        title,
        category,
        description,
        price,
        _id
      });
    } else {
      console.error("Received message with undefined value");
    }
  }
}
