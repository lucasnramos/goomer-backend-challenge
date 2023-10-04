import { Router } from "express";
import pool from "./adapters/mysql-adapter.js";
import {
  IRestaurantRespository,
  MySQLRestaurantRepository,
} from "./repositories/restaurant-repository.js";
import GetAllRestaurantsUseCase from "./use-cases/restaurant-use-cases.js";

const router = Router();

const dataSource = pool;
let repository: IRestaurantRespository = new MySQLRestaurantRepository(
  dataSource
);
let getAllRestaurants: GetAllRestaurantsUseCase = new GetAllRestaurantsUseCase(
  repository
);

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
router.post("/restaurants", (_, res) => {
  console.log("hello from api/v1");
  res.sendStatus(200);
});
router.put("/restaurants/:id", (_, res) => {
  console.log("hello from api/v1");
  res.sendStatus(200);
});
router.delete("/restaurants/:id", (_, res) => {
  console.log("hello from api/v1");
  res.sendStatus(200);
});

export default router;
