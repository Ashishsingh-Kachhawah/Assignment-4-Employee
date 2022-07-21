const express = require("express");
// const employeeLocationController = require("../controllers/employeeLiveLocation.controller");
const employeeLocationController = require("../controllers/employeeLocation.controller");

const employeeLocationRouter = express.Router();

// MIDDLEWARE

employeeLocationRouter.use((req, res, next) => {
    console.log("ip address:",req.ip);
    next();
});

employeeLocationRouter.post("/", employeeLocationController.postEmployeeLocation);
employeeLocationRouter.get("/", employeeLocationController.getEmployeeLocation );
employeeLocationRouter.get("/:employeeid", employeeLocationController.getIndividualEmployeeLocation);
// employeeLocationRouter.patch("/:employeeid", employeeLocationController.patchEmployeeLocation)

module.exports = employeeLocationRouter;