import { Router } from "express";
import envelopes from "../utils/envelopesData.mjs";

const envelopeRouter = Router();

envelopeRouter.param("id", (req, res, next, id) => {
  const catId = id;
  const foundId = envelopes.findIndex(item => item.id === catId);
  if (foundId === -1) return res.status(404).send("Category not available");
  req.foundId = envelopes[foundId];
  req.foundIdIndex = foundId
  next();
});

envelopeRouter.get("/", (req, res) => {
  res.send(envelopes);
});

envelopeRouter.get("/:id", (req, res) => {
  const foundId = req.foundId;
  res.send(foundId);
});

envelopeRouter.post("/", (req, res) => {
  const { body } = req;
  const newCat = {
    id: body.category.slice(0, 3) + 1,
    ...body
  };
  envelopes.push(newCat);
  res.status(201).send(newCat);
});

// envelopeRouter.put("/:id", (req, res) => {
//   const { body, foundId, foundIdIndex } = req;
//   const updateCat = {
//     ...foundId,
//     ...body
//   }
//   envelopes[foundIdIndex] = updateCat
//   res.status(202).send(updateCat)
// });


export default envelopeRouter;
