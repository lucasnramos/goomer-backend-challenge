export default class Discount {
  id?: number;
  productId: number;
  description: string;
  discountedPrice: number;
  period: string;

  constructor(
    { productId, description, discountedPrice, period }: Discount,
    id?: number
  ) {
    this.productId = productId;
    this.description = description;
    this.discountedPrice = discountedPrice;
    this.period = period;
    this.id = id;
  }
}
