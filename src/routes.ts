import { Router } from "express";
import pool from "./adapters/mysql-adapter.js";
import {
  IRestaurantRespository,
  MySQLRestaurantRepository,
} from "./repositories/restaurant-repository.js";
import {
  CreateRestaurantsUseCase,
  DeleteRestaurantUsecase,
  GetAllRestaurantsUseCase,
} from "./use-cases/restaurant-use-cases.js";

const router = Router();

const dataSource = pool;
const repository: IRestaurantRespository = new MySQLRestaurantRepository(
  dataSource
);
const getAllRestaurants: GetAllRestaurantsUseCase =
  new GetAllRestaurantsUseCase(repository);
const createRestaurant = new CreateRestaurantsUseCase(repository);
const deleteRestaurant = new DeleteRestaurantUsecase(repository);

router.get("/restaurants", async (_, res) => {
  try {
    const restaurants = await getAllRestaurants.execute();
    res.send(restaurants);
  } catch (error) {
    console.error("Failed to retrieve data", error);
    res.status(500).send("Failed to retrieve data");
  }
});
router.get("/restaurants/:id", (_, res) => {
  console.log("hello from api/v1");
  res.sendStatus(200);
});
router.post("/restaurants", async (req, res) => {
  try {
    const restaurant = req.body;
    await createRestaurant.execute(restaurant);
    res.sendStatus(201);
  } catch (error) {
    console.error("Failed to retrieve data", error);
    res.status(500).send("Failed to retrieve data");
  }
});
router.put("/restaurants/:id", (_, res) => {
  console.log("hello from api/v1");
  res.sendStatus(200);
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
