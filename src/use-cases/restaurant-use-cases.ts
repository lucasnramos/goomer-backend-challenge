import Restaurant from "../entities/restaurant.js";
import { IRestaurantRespository } from "../repositories/restaurant-repository.js";

export default class GetAllRestaurantsUseCase {
  constructor(private restaurantRepository: IRestaurantRespository) {}

  async execute(): Promise<Restaurant[]> {
    return await this.restaurantRepository.findAll();
  }
}
