import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  studentId: { type: String, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  section: { type: String, require: true },
  program: { type: String, require: true },
});

export default mongoose.model("Student", studentSchema);
