import { KafkaProducer, Subjects } from "@ezart/common";
import { injectable } from "inversify";

export interface Event {
  subject: Subjects;
  data: any;
}
@injectable()
export class UserCreate extends KafkaProducer<Event> {
  subject: Subjects.TestTopic = Subjects.TestTopic; 
}
