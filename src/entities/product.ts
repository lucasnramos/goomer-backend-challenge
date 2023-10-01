export default class Product {
  id?: number;
  name: string;
  price: number;
  restaurantId: number;
  category: string;
  pictureUrl: string;

  constructor(
    { name, price, category, pictureUrl, restaurantId }: Product,
    id?: number
  ) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.pictureUrl = pictureUrl;
    this.restaurantId = restaurantId;
    this.id = id;
  }
}
