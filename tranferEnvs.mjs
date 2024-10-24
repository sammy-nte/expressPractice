import { Router } from "express";

const transferEnvsRouter = Router();

transferEnvsRouter.get("/", (req, res) => {
  res.send("transfer endpoint");
});

export default transferEnvsRouter;
