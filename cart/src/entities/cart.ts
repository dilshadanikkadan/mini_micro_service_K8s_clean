export class Cart {
  constructor(
    public readonly UserId: string,
    public readonly ProductId: number,
    public readonly Items: []
  ) {}
}
