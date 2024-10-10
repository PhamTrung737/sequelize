import express from "express"
import resRouter from "./res.router.js";
import amountRouter from "./amount.router.js";
import orderRouter from "./order.router.js";

const rootRouter = express.Router();
rootRouter.use("/like",resRouter)
rootRouter.use("/amount",amountRouter)
rootRouter.use("/order",orderRouter)
export default rootRouter