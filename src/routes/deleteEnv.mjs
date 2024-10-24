import { Router } from "express";
import envelopes from "../utils/envelopesData.mjs";

const deleteEnvRouter = Router();

deleteEnvRouter.param("id", (req, res, next, id) => {
  const foundIndex = envelopes.findIndex(item => item.id === id);
  if (foundIndex === -1) return res.status(404).send("Category not found");
  req.foundIndexId = foundIndex;
  req.foundCat = envelopes[foundIndex];
  next();
});

deleteEnvRouter.delete("/:id", (req, res) => {
  const { foundCat, foundIndexId } = req;
  const unaId = envelopes.findIndex(item => item.id === "uni1");
  let unallocated = envelopes[unaId];
  const balance = foundCat.balance;
  if (balance === 0) {
    envelopes.splice(foundIndexId, 1);
    return res.sendStatus(204);
  }
  if (balance > 1) {
    const transfer = {
      ...unallocated,
      balance: foundCat.balance + unallocated.balance
    };
    envelopes[unaId] = transfer;
    res.send(
      `Amount of $${foundCat.balance} has been moved to the Unallocated section current unallocated balance is: ${envelopes[
        unaId
      ].balance}. ${foundCat.category} has been deleted`
    );
    envelopes.splice(foundIndexId, 1);
  }
});

export default deleteEnvRouter;
