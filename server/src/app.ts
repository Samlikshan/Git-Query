import express from "express";
import morgan from "morgan";

import { errorHandler } from "./presentation/middlewares/erorr.middleware";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ message: "Api is running" });
});

app.use(errorHandler);
export default app;
