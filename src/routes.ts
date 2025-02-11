import { Router } from "express";
import pool from "./adapters/mysql-adapter";
import {
  IRestaurantRespository,
  InMemoryRestaurantRepository,
  MySQLRestaurantRepository,
} from "./repositories/restaurant-repository";
import {
  CreateRestaurantsUseCase,
  DeleteRestaurantUsecase,
  GetAllRestaurantsUseCase,
  GetRestaurantUseCase,
  UpdateRestaurantUseCase,
} from "./use-cases/restaurant-use-cases";

const router = Router();

const dataSource = pool;
// use a simple in memory repository for initial testing purposes
const repository: IRestaurantRespository =
  InMemoryRestaurantRepository.getInstance();

const getAllRestaurants: GetAllRestaurantsUseCase =
  new GetAllRestaurantsUseCase(repository);
const createRestaurant = new CreateRestaurantsUseCase(repository);
const deleteRestaurant = new DeleteRestaurantUsecase(repository);
const getRestaurant = new GetRestaurantUseCase(repository);
const updateRestaurant = new UpdateRestaurantUseCase(repository);

router.get("/restaurants", async (_, res) => {
  try {
    const restaurants = await getAllRestaurants.execute();
    res.send(restaurants);
  } catch (error) {
    console.error("Failed to retrieve data", error);
    res.status(500).send("Failed to retrieve data");
  }
});
router.get("/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await getRestaurant.execute(id);
    res.send(restaurant);
  } catch (error) {
    console.error("Failed to retrieve data", error);
    res.status(500).send("Failed to retrieve data");
  }
});
router.post("/restaurants", async (req, res) => {
  try {
    const restaurant = req.body;
    const result = await createRestaurant.execute(restaurant);
    res.status(201).send(result);
  } catch (error) {
    console.error("Failed to save new restaurant", error);
    res.status(500).send("Failed to save new restaurant");
  }
});
router.put("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = req.body;
    const updated = updateRestaurant.execute(restaurant);
    res.send(updated);
  } catch (error) {
    console.error("Failed to retrieve data", error);
    res.status(500).send("Failed to retrieve data");
  }
});
router.delete("/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteRestaurant.execute(id);
    res.sendStatus(200);
  } catch (error) {
    console.error("Failed do delete resource", error);
    res.status(500).send("Failed do delete resource");
  }
});

export default router;
