import express from "express";
import {
  registerAttendance,
  getAttendance,
  attendanceReportAll,
} from "../controllers/attendance.js";

const router = express.Router();

router.post("/", registerAttendance);
router.get("/", getAttendance);
router.get("/attendance-report-all-employees", attendanceReportAll);
export default router;
