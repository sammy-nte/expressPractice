import { Router } from "express";
import envelopes from "../utils/envelopesData.mjs";

const deductEnvRouter = Router();

deductEnvRouter.param("id", (req, res, next, id) => {
  const catId = id;
  const foundId = envelopes.findIndex(item => item.id === catId);
  if (foundId === -1) return res.status(404).send("Category not found");
  req.foundCat = envelopes[foundId];
  req.foundIdIndex = foundId;
  next();
});

deductEnvRouter.put("/:id", (req, res) => {
  const { body: { amount }, foundCat, foundIdIndex } = req;
  const updateAmount = {
    ...foundCat,
    balance: foundCat.balance - amount
  };
  envelopes[foundIdIndex] = updateAmount;
  const responseSentence = `${envelopes[foundIdIndex]
    .category} updated. Balance is :${envelopes[foundIdIndex].balance}`;
  res.send(responseSentence);
});

export default deductEnvRouter;
