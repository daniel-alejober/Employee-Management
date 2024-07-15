import express from "express";
import { addEmployee, getEmployess } from "../controllers/employee.js";
const router = express.Router();

router.post("/addemployee", addEmployee);
router.get("/", getEmployess);

export default router;
