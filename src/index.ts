import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_: Request, res: Response) => {
  res.status(200).send("Done!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
