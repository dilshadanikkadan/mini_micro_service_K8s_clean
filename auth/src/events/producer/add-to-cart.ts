import { KafkaProducer, Subjects } from "@ezart/common";
import { injectable } from "inversify";
import { Producer } from "kafkajs";

export interface Event {
  subject: Subjects;
  data: any;
}
@injectable()
export class addCartProducer extends KafkaProducer<Event> {
  constructor(producer: Producer) {
    super(producer);
  } 
  subject: Subjects.cartAdded = Subjects.cartAdded;
}
