import { Router } from "express";
import envelopes from "../utils/envelopesData.mjs";

const transferEnvsRouter = Router();

transferEnvsRouter.param(["from", "to"], (req, res, next, value, name) => {
  const envelope = envelopes.find(item => item.id === value);

  if (!envelope) {
    return res.status(404).send(`Envelope with id ${value} not found`);
  }
  
  req[name] = envelope;
  next();
});

// transferEnvsRouter.param("id", (req, res, next, value) => {
//   console.log("CALLED ONLY ONCE with", value);
//   next();
// });

transferEnvsRouter.get("/:id/:page", (req, res) => {
  console.log("and this matches too");
  res.end();
});

export default transferEnvsRouter;
