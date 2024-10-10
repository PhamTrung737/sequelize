import express from "express"
import { createAmountByUserIdAndResId, getAmountByUserIdAndResId } from "../controller/amount.controller.js";


const amountRouter = express.Router();
amountRouter.get("/list-amount/:id_user/:id_res",getAmountByUserIdAndResId)
amountRouter.post("/update",createAmountByUserIdAndResId)
export default amountRouter;