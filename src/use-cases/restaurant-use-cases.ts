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

  async execute(restaurant: Restaurant): Promise<Restaurant> {
    const restaurants = await new GetAllRestaurantsUseCase(
      this.restaurantRepository
    ).execute();
    const hasRestaurant =
      restaurants.findIndex((item) => item.name === restaurant.name) > -1;

    if (hasRestaurant) {
      throw new Error(`Restaurant ${restaurant.name} already exists`);
    }

    const response = await this.restaurantRepository.create(restaurant);
    console.log(response);

    return response;
  }
}

export class DeleteRestaurantUsecase {
  constructor(private restaurantRepository: IRestaurantRespository) {}
  async execute(id: string) {
    return await this.restaurantRepository.delete(id);
  }
}

export class GetRestaurantUseCase {
  constructor(private restaurantRepository: IRestaurantRespository) {}
  async execute(id: string): Promise<Restaurant> {
    return await this.restaurantRepository.findById(id);
  }
}

export class UpdateRestaurantUseCase {
  constructor(private restaurantRepository: IRestaurantRespository) {}
  async execute(props: Restaurant): Promise<Restaurant> {
    return await this.restaurantRepository.update(props);
  }
}
