import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  country: { type: String, required: true },
  employeeName: { type: String, required: true },
  designation: { type: String, required: true },
  joiningDate: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  salary: { type: Number, required: true },
  activeEmployee: { type: Boolean, default: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
