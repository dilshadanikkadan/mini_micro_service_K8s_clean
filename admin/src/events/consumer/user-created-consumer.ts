import { KafkaConsumer, Subjects } from "@ezart/common";
import { inject, injectable } from "inversify";
import { EachMessagePayload } from "kafkajs";
import { IAdminRepository } from "../../interfaces/IAdminRepository";
import { INTERFACE_TYPE } from "../../utils/appConst";
import { consumer } from "../../config/kafaka.config";
import { Consumer } from "kafkajs";
@injectable()
export class UserCreatedConsumer extends KafkaConsumer {
  subject: Subjects = Subjects.TestTopic;
  groupId = Subjects.TestTopic;

  constructor(
    @inject(INTERFACE_TYPE.AdminRepository)
    private adminRepository: IAdminRepository
  ) {
    super(consumer);
  }
  async handleMessage(payload: EachMessagePayload): Promise<void> {
    if (payload.message.value) {
      const credentials = JSON.parse(payload.message.value.toString());
      console.log(`Received message on topic ${this.subject}:`, credentials);
      const { username, email,_id } = credentials.payload;
      await this.adminRepository.build({
        username,
        email,
        isAdmin: false,
        _id
      });
      this.ack("admin-service").catch((error) => {
        console.error(`Error sending acknowledgment: ${error}`);
      });
    } else {
      console.error("Received message with undefined value");
    }
  }
}
