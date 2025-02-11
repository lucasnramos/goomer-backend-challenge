import Restaurant from "../entities/restaurant.js";
import { server } from "../server.js";
import request from "supertest";
import { seedDatabase } from "../__test-setup__/setup.js";

describe("API Endpoints", () => {
  beforeEach(async () => {
    server.close();
    await seedDatabase();
  });
  afterEach(() => server.close());

  it("should return a list of restaurants", async () => {
    const res = await request(server).get("/api/v1/restaurants");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(1);
  });

  it("should add a new restaurant", async () => {
    const restaurant: Restaurant = {
      name: "__Jest restaurant",
      address: "Rua Paes de Linhares, 342, Jardim Esqueci, Sorocaba SP",
      businessHours: "De Segunda à Sexta das 09h as 18h, Sábado das 10h as 13h",
      pictureUrl:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    };
    const res = await request(server)
      .post("/api/v1/restaurants")
      .send(restaurant);

    expect(res.statusCode).toEqual(201);
  });

  it("should return the new restaurant with the id", async () => {
    const restaurant: Restaurant = {
      name: "My New Restaurant",
      address: "Rua Paes de Linhares, 342, Jardim Esqueci, Sorocaba SP",
      businessHours: "De Segunda à Sexta das 09h as 18h, Sábado das 10h as 13h",
      pictureUrl:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
    };
    const res = await request(server)
      .post("/api/v1/restaurants")
      .send(restaurant);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });
});

afterAll(() => server.close());
