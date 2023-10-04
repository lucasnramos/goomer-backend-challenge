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
    const restaurants = await new GetAllRestaurantsUseCase(
      this.restaurantRepository
    ).execute();
    const hasRestaurant =
      restaurants.findIndex((item) => item.name === restaurant.name) > -1;

    if (hasRestaurant) {
      throw new Error(`Restaurant ${restaurant.name} already exists`);
    }

    return await this.restaurantRepository.create(restaurant);
  }
}
