import express from "express"
import { createOrderByUserIdAndFoodId } from "../controller/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("",createOrderByUserIdAndFoodId)

export default orderRouter