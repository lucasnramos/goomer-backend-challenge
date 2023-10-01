import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import router from "./routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
