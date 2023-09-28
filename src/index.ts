import express, { Request, Response } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import { MysqlError, createConnection } from "mysql";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});
connection.connect();

app.get("/restaurant", (_: Request, res: Response) => {
  connection.query(
    "SELECT * FROM restaurant",
    (err: MysqlError | null, results?: Restaurant[]) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      res.status(200).json(results);
    }
  );
});

app.post("/restaurant", (req: Request, res: Response) => {
  const restaurant: Restaurant = req.body;
  connection.query(
    `INSERT INTO restaurant (name, address, business_hours, picture_url) VALUES ('${restaurant.name}', '${restaurant.address}', '${restaurant.businessHours}', '${restaurant.picture}')`,
    (err, dbRes) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      console.log("Added to database");
      res.status(200).json(dbRes);
    }
  );
});

app.put("/restaurant", (req: Request, res: Response) => {
  const restaurant: Restaurant = req.body;
  connection.query(
    `UPDATE restaurant
      SET name ='${restaurant.name}', address = '${restaurant.address}', business_hours = '${restaurant.businessHours}', picture_url='${restaurant.picture}'
    WHERE id = ${restaurant.id}`,
    (err, dbRes) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      console.log("Updated record of id", restaurant.id);
      res.status(200).json(dbRes);
    }
  );
});

app.delete("/restaurant", (req: Request, res: Response) => {
  connection.query(
    `DELETE FROM restaurant WHERE id=${req.query.id}`,
    (err, dbRes) => {
      if (err) {
        res.sendStatus(500);
        throw err;
      }
      res.status(200).json(dbRes);
    }
  );
});

app.get("/product", (_: Request, res: Response) => {
  const product: Product = {
    id: 1,
    picture: "", // probably a link to CDN file
    name: "Batata frita",
    price: 10,
    category: "Acompanhamentos", // maybe ID to ref a category model / table
    restaurantId: 1,
  };
  res.status(200).json(product);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

type Restaurant = {
  id?: number;
  name: string;
  address: string;
  businessHours: string;
  picture: string; // probably a link to CDN file
};

type Product = {
  id?: number;
  picture: string; // probably a link to CDN file
  name: string;
  price: number;
  category: string; // maybe ID to ref a category model / table
  restaurantId: number;
  discount?: Discount;
};

type Discount = {
  productId: number;
  description: string;
  discountedPrice: number;
  period: string;
};
