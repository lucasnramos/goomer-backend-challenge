import { Pool, PoolConnection } from "mysql";
import { promisify } from "util";
import Restaurant from "../entities/restaurant.js";
import { randomUUID } from "crypto";

export interface IRestaurantRespository {
  findAll(): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant>;
  create(props: Restaurant): Promise<void>;
  delete(id: string): Promise<void>;
  update(props: Restaurant): Promise<void>;
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

  async create(props: Restaurant): Promise<void> {
    const getConnection = promisify(this.dataSource.getConnection).bind(
      this.dataSource
    );
    const query = promisify(this.dataSource.query).bind(this.dataSource);

    try {
      const connection: PoolConnection = await getConnection();
      await query(
        `INSERT INTO restaurant (name, address, businessHours, pictureUrl) VALUES ('${props.name}', '${props.address}', '${props.businessHours}', '${props.pictureUrl}')`
      );
      connection.release();
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

  async update(restaurant: Restaurant): Promise<void> {
    const getConnection = promisify(this.dataSource.getConnection).bind(
      this.dataSource
    );
    const query = promisify(this.dataSource.query).bind(this.dataSource);

    try {
      const connection: PoolConnection = await getConnection();
      await query(`UPDATE restaurant
      SET name ='${restaurant.name}', address = '${restaurant.address}', business_hours = '${restaurant.businessHours}', picture_url='${restaurant.pictureUrl}'
    WHERE id = ${restaurant.id}`);
      connection.release();
    } catch (err) {
      console.error(`Error in Deleting id ${restaurant}`, err);
      throw err;
    }
  }
}

export class InMemoryRestaurantRepository implements IRestaurantRespository {
  private restaurants: Restaurant[] = [];

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
  async create(props: Restaurant): Promise<void> {
    const id = randomUUID();
    this.restaurants.push({ ...props, id });
  }
  async delete(id: string): Promise<void> {
    const index = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id
    );
    if (index > -1) {
      this.restaurants.splice(index, 1);
    }
  }
  async update(props: Restaurant): Promise<void> {
    // push for now, so that we can test
    this.restaurants.push(props);
  }
}
