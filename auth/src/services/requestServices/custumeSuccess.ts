export abstract class CustomSucces {
  abstract statusCode: number;

  abstract serializeSuccess(): {message:string}[];
}
