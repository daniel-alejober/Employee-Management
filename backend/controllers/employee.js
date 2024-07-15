import Employee from "../models/employee.js";

const addEmployee = async (req, res) => {
  try {
    const {
      country,
      employeeName,
      designation,
      joiningDate,
      dateOfBirth,
      activeEmployee,
      phoneNumber,
      address,
      salary,
    } = req.body;

    const employee = await Employee.create({
      country,
      employeeName,
      designation,
      joiningDate,
      dateOfBirth,
      phoneNumber,
      address,
      salary,
    });
    res.status(200).json({ message: "Employee saved successfully", employee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add an employee" });
  }
};

const getEmployess = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({ message: "All Employess", employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve the employees" });
  }
};

export { addEmployee, getEmployess };
