import { Router } from "express";

const router = Router();

router.get("/restaurants", (_, res) => {
  console.log("hello from api/v1");
  res.sendStatus(200);
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
