import express from "express";
import morgan from "morgan";
import cors from "cors";

import { errorMiddleware } from "./presentation/middlewares/erorr.middleware";
import indexrouter from "./presentation/routes/index";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", indexrouter);

app.use(errorMiddleware);
export default app;
