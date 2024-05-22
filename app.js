import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import studentsRouter from "./api/routes/students.js";

const app = express();

mongoose.connect(
  "mongodb+srv://athensangel:f979N54cJyZFI5pC@cluster0.1bb6e6h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

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
