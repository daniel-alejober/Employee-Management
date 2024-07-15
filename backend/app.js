import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./db.js";
import employeeRoutes from "./routes/employee.js";
import attendanceRoutes from "./routes/attendance.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/attendance", attendanceRoutes);

const startServer = async () => {
  const port = process.env.PORT || 4000;
  try {
    await connectDB(process.env.MONGO_DB);
    app.listen(port, () => {
      console.log(`Server connected in the port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
