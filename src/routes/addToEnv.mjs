import { Router } from "express";
import envelopes from "../utils/envelopesData.mjs";

const addToEnvRouter = Router();

addToEnvRouter.param("id", (req, res, next, id) => {
  const foundIndex = envelopes.findIndex(item => item.id === id);
  if (foundIndex === -1) return res.status(404).send("Category not found");
  req.foundIndexId = foundIndex;
  req.foundCat = envelopes[foundIndex];
  next();
});

addToEnvRouter.put("/:id", (req, res) => {
  const { body: { amount }, foundCat, foundIndexId } = req;
  const updateAmount = {
    ...foundCat,
    balance: foundCat.balance + amount
  };
  envelopes[foundIndexId] = updateAmount;
  const responseSentence = `${envelopes[foundIndexId]
    .category} updated. Balance is :${envelopes[foundIndexId].balance}`;
  res.send(responseSentence);
});

export default addToEnvRouter;
