import Restaurant from "../entities/restaurant.js";
import { IRestaurantRespository } from "../repositories/restaurant-repository.js";

export class GetAllRestaurantsUseCase {
  constructor(private restaurantRepository: IRestaurantRespository) {}

  async execute(): Promise<Restaurant[]> {
    return await this.restaurantRepository.findAll();
  }
}

export class CreateRestaurantsUseCase {
  constructor(private restaurantRepository: IRestaurantRespository) {}

  async execute(restaurant: Restaurant): Promise<void> {
    return await this.restaurantRepository.create(restaurant);
  }
}
