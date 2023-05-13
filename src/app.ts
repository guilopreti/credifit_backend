import "express-async-errors";
import express from "express";
import router from "./app.routes";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;
