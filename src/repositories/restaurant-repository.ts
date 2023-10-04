import Restaurant from "../entities/restaurant.js";

export interface IRestaurantRespository {
  findAll(): Promise<Restaurant[]>;
  create(props: Restaurant): Promise<void>;
  update(props: Restaurant): Promise<void>;
  delete(id: number): Promise<void>;
}
