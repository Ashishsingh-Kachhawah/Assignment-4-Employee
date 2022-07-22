const express = require("express");
const employeeAttendanceController = require("../controllers/employeeAttendance.controller");

const employeeAttendanceRouter = express.Router();

// MIDDLEWARE
employeeAttendanceRouter.use((req, res, next) => {
    console.log("ip address:",req.ip);
    next();
});

employeeAttendanceRouter.post("/", employeeAttendanceController.postEmployeeAttendance);
employeeAttendanceRouter.get("/", employeeAttendanceController.getEmployeeAttendance );
employeeAttendanceRouter.get("/:id", employeeAttendanceController.getIndividualEmployeeAttendance);
employeeAttendanceRouter.patch("/:attendance_id", employeeAttendanceController.patchEmployeeAttendance)

module.exports = employeeAttendanceRouter;