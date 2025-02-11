import Restaurant from "../entities/restaurant.js";
import { InMemoryRestaurantRepository } from "../repositories/restaurant-repository.js";

const repository = InMemoryRestaurantRepository.getInstance();

const seedDatabase = async () => {
  const restaurant = new Restaurant({
    name: "__test restaurant",
    address: "Test Address",
    businessHours: "Monday-Friday 9:00-18:00",
    pictureUrl: "https://example.com/image.jpg",
  });

  await repository.create(restaurant);
};

export { repository, seedDatabase };
