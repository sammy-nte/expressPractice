import { Router } from "express";
import envelopeRouter from "./envelopes.mjs";
import addToEnvRouter from "./addToEnv.mjs";
import deductEnvRouter from "./deductEnv.mjs";
import deleteEnvRouter from "./deleteEnv.mjs";
import transferEnvsRouter from "./tranferEnvs.mjs";

const routes = Router()

routes.use("/envelope", envelopeRouter)
routes.use("/add", addToEnvRouter)
routes.use("/deduct", deductEnvRouter)
routes.use("/delete", deleteEnvRouter)
routes.use("/transfer", transferEnvsRouter)

export default routes