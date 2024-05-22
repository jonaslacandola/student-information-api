import { Router } from "express";
import Student from "../models/studentModel.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const docs = await Student.find().select(
      "studentId name email section program"
    );

    res.status(200).json({
      count: docs.length,
      students: docs,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
});

router.post("/", (req, res) => {
  const student = req.body;

  res.status(200).json({
    message: `Post request for information, payload ${information.name}`,
  });
});

router.get("/:studentId", (req, res) => {
  const studentId = req.params.studentId;

  res.status(200).json(`Get request for information id ${studentId}`);
});

export default router;
