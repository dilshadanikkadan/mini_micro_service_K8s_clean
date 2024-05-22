import { KafkaProducer, Subjects } from "@ezart/common";
import { injectable } from "inversify";

export interface Event {
  subject: Subjects;
  data: any;
}
@injectable()
export class CartReposnse extends KafkaProducer<Event> {
  subject: Subjects.CartResponse = Subjects.CartResponse; 
}
