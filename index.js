import express from "express";
import rootRouter from "./src/router/root.router.js";

const app = express();

app.use(express.json());
app.use(rootRouter);

app.listen(9090,()=>{console.log("first")});

