import { Pool, PoolConnection } from "mysql";
import { promisify } from "util";
import Restaurant from "../entities/restaurant.js";
import { randomUUID } from "crypto";

export interface IRestaurantRespository {
  findAll(): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant>;
  create(props: Restaurant): Promise<Restaurant>;
  delete(id: string): Promise<void>;
  update(props: Restaurant): Promise<Restaurant>;
}

export class MySQLRestaurantRepository implements IRestaurantRespository {
  constructor(private dataSource: Pool) {}

  async findAll(): Promise<Restaurant[]> {
    const getConnection = promisify(this.dataSource.getConnection).bind(
      this.dataSource
    );
    const query = promisify(this.dataSource.query).bind(this.dataSource);

    try {
      const connection: PoolConnection = await getConnection();
      const results = (await query("SELECT * FROM restaurant")) as Restaurant[];
      connection.release();
      return results;
    } catch (err) {
      console.error("Error in findAll: ", err);
      throw err;
    }
  }

  async findById(id: string): Promise<Restaurant> {
    const getConnection = promisify(this.dataSource.getConnection).bind(
      this.dataSource
    );
    const query = promisify(this.dataSource.query).bind(this.dataSource);

    try {
      const connection: PoolConnection = await getConnection();
      const results = (await query(
        `SELECT * FROM restaurant where id = ${id}`
      )) as Restaurant;
      connection.release();
      return results;
    } catch (err) {
      console.error("Error in findAll: ", err);
      throw err;
    }
  }

  async create(props: Restaurant): Promise<Restaurant> {
    const getConnection = promisify(this.dataSource.getConnection).bind(
      this.dataSource
    );
    const query = promisify(this.dataSource.query).bind(this.dataSource);

    try {
      const connection: PoolConnection = await getConnection();
      const result = await query(
        `INSERT INTO restaurant (name, address, businessHours, pictureUrl) VALUES ('${props.name}', '${props.address}', '${props.businessHours}', '${props.pictureUrl}')`
      );
      connection.release();
      return result as Restaurant;
    } catch (err) {
      console.error("Error in create: ", err);
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    const getConnection = promisify(this.dataSource.getConnection).bind(
      this.dataSource
    );
    const query = promisify(this.dataSource.query).bind(this.dataSource);

    try {
      const connection: PoolConnection = await getConnection();
      await query(`DELETE FROM restaurant WHERE id = ${id}`);
      connection.release();
    } catch (err) {
      console.error(`Error in Deleting id ${id}`, err);
      throw err;
    }
  }

  async update(restaurant: Restaurant): Promise<Restaurant> {
    const getConnection = promisify(this.dataSource.getConnection).bind(
      this.dataSource
    );
    const query = promisify(this.dataSource.query).bind(this.dataSource);

    try {
      const connection: PoolConnection = await getConnection();
      const response = await query(`UPDATE restaurant
      SET name ='${restaurant.name}', address = '${restaurant.address}', business_hours = '${restaurant.businessHours}', picture_url='${restaurant.pictureUrl}'
    WHERE id = ${restaurant.id}`);
      connection.release();
      return response as Restaurant;
    } catch (err) {
      console.error(`Error in Deleting id ${restaurant}`, err);
      throw err;
    }
  }
}

export class InMemoryRestaurantRepository implements IRestaurantRespository {
  private static instance: InMemoryRestaurantRepository;
  private restaurants: Restaurant[] = [];

  private constructor() {}

  static getInstance(): InMemoryRestaurantRepository {
    if (!InMemoryRestaurantRepository.instance) {
      InMemoryRestaurantRepository.instance =
        new InMemoryRestaurantRepository();
    }
    return InMemoryRestaurantRepository.instance;
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurants;
  }

  async findById(id: string): Promise<Restaurant> {
    const res = this.restaurants.find((restaurant) => restaurant.id === id);
    if (res) {
      return res;
    } else {
      return {} as Restaurant;
    }
  }

  async create(props: Restaurant): Promise<Restaurant> {
    const id = randomUUID();
    this.restaurants.push({ ...props, id });
    return { ...props, id };
  }

  async delete(id: string): Promise<void> {
    const index = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id
    );
    if (index > -1) {
      this.restaurants.splice(index, 1);
    }
  }

  async update(props: Restaurant): Promise<Restaurant> {
    // push for now, so that we can test
    this.restaurants.push(props);
    return props as Restaurant;
  }
}
