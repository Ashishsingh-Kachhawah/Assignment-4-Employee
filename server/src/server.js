// import express from "express";

const express = require("express");
const path = require("path");
const employeeDetailsRouter = require("./routers/employeeDetails.router");
const employeeAttendanceRouter = require("./routers/employeeAttendance.router");
const employeeLocationRouter = require("./routers/employeeLocation.router");

var cors = require('cors')

const app = express();
// SET HANDELBARS TEMPLATE ENGINE
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "views")) ;

const PORT = 3002;

// app.use(cors())

// app.options('/employeedetails', cors()) 
app.options('*', cors())
app.use((req, res, next) => {
   const start = Date.now();
   next();
   const timeTaken = Date.now() - start;
   console.log(`${req. method} ${req.baseUrl}${req.url} ${timeTaken}ms`);
})

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3002/"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

app.use("/employeedetails", express.static(path.join(__dirname, "public")));
app.use(express.json());

// //RENDER HANDELBARS FILE
// app.get("/", (req, res) => {
//    res.render("index", {
//       title: "Practice on express",
//       caption: "Practice for templating Engines",
//    });
// });

// RELATED TO employee Details
app.use("/employeedetails", cors(),  employeeDetailsRouter);

// RELATED TO ATTENDANCE
app.use("/employeeattendance", employeeAttendanceRouter);

// RELATED TO LOCATION
app.use("/employeelocation", employeeLocationRouter);

 app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
 });