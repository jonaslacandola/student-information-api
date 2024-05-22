import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import studentsRouter from "./api/routes/students.js";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/students", studentsRouter);

app.use((req, res, next) => {
  const error = new Error("Couldn't handle request, file not found");
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  res.status(500 || error.status).json({
    status: 500 || error.status,
    error: error.message,
  });
});

export default app;
