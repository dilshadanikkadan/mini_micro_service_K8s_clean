export class Product {
  constructor(
    public readonly title: string,
    public readonly price: number,
    public readonly description: string,
    public readonly category: number,
    public readonly _id: any
  ) {}
}
