import express from "express"
import { getListByUserIdAndResId, updateStatusLikeByUserIdAndResId } from "../controller/res.controller.js";


const resRouter = express.Router();
resRouter.get("/list-like/:user_id/:res_id",getListByUserIdAndResId);
resRouter.post("/update",updateStatusLikeByUserIdAndResId)
export default resRouter;