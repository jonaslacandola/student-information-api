import { Router } from "express";
import mongoose from "mongoose";

import Student from "../models/studentModel.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const docs = await Student.find().select(
      "studentId name email section program"
    );

    res.status(200).json({
      count: docs.length,
      students: docs.map((doc) => {
        return {
          _id: doc._id,
          studentId: doc.studentId,
          name: doc.name,
          email: doc.email,
          section: doc.section,
          program: doc.program,
          student: {
            type: "GET",
            url: `https://student-information-l03n.onrender.com/v1/students/${doc._id}`,
          },
        };
      }),
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    studentId: req.body.studentId,
    name: req.body.name,
    email: req.body.email,
    section: req.body.section,
    program: req.body.program,
  });

  try {
    const result = await student.save();

    res.status(201).json({
      message: "Student created successfully",
      student: {
        _id: result._id,
        studentId: result.studentId,
        name: result.name,
        email: result.email,
        section: result.section,
        program: result.program,
        student: {
          type: "GET",
          url: `https://student-information-l03n.onrender.com/v1/students/${result._id}`,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Student.findById(id).select(
      "_id studentId name email section program"
    );

    if (result)
      res.status(200).json({
        student: result,
      });
    else {
      res.status(404).json({
        status: 404,
        error: "Student couldn't be found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
});

export default router;
