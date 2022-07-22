const express = require("express");
const employeeDetailsController = require("../controllers/employeeDetails.controller");

const employeeDetailsRouter = express.Router();

// MIDDLEWARE
employeeDetailsRouter.use((req, res, next) => {
    console.log("ip address:",req.ip);
    next();
});

employeeDetailsRouter.post("/", employeeDetailsController.postEmployeeDetails);
employeeDetailsRouter.get("/", employeeDetailsController.getEmployeeDetails );
employeeDetailsRouter.get("/:id", employeeDetailsController.getIndividualEmployee);

module.exports = employeeDetailsRouter;