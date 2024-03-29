const employeeDetailsModel = require("../models/employeeDetails.model")

const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin#123",
    database: "postgres"
})

client.connect();

// CREATE TABLE
client.query(`CREATE  TABLE IF NOT EXISTS employeedetails(id SERIAL PRIMARY KEY,
    employeeid INT NOT NULL CHECK (employeeid >= 0),
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    full_name VARCHAR(250) NOT NULL,
    email VARCHAR(250),
    mobile BIGINT NOT NULL CHECK (mobile >= 0),
    access_right VARCHAR(250) NOT NULL,
    val text,
    UNIQUE (employeeid,first_name,last_name,full_name,email,mobile,access_right)
    )`, (error, res) =>{
    if(!error){
       console.log("employeedetailsController:",res.rows);
    }else{
        console.log(error.message);
    }
    // client.end;
})
client.query(
  `CREATE TABLE employeeattendance(
   attendance_id INT GENERATED ALWAYS AS IDENTITY,
   id INT,
   employeeid INT,
   date DATE NOT NULL,
   login_time TIME NOT NULL,
   logout_time TIME NOT NULL,
   PRIMARY KEY(attendance_id),
   CONSTRAINT fk_employee
      FOREIGN KEY(id) 
	  REFERENCES employeedetails(id)
) `,
  (error, res) => {
    if (!error) {
      console.log("employeeAttendance:", res.rows);
    } else {
      console.log("employeeAttendanceError :", error.message);
    }
  }
);
// client.query(
//   `COPY employeeattendance(attendance_id,id,employeeid, date,login_time,logout_time)
// FROM '/Users/darios/Assignment-4-Employee/server/src/models/employeeattendanceid.csv'

// DELIMITER ','
// CSV HEADER`,
//   (error, res) => {
//     if (!error) {
//       console.log("employeeAttendancecsv:", res.rows);
//     } else {
//       console.log("employeeAttendancecsvError :", error.message);
//     }
//   }
// );
client.end;

// function postEmployeeDetails(req, res){

//     if(!req.body.employee_name){
//       return res.status(400).json({
//           error: 'Missing user name'
//        });
//     }
 
//     const newuser = {
//       employee_id: req.body.employee_id,
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       mobile: req.body.mobile,
//       full_name: req.body.full_name,
//       access_right: req.body.access_right
//     };
 
//     employeeDetailsModel.push(newuser);
    
//     res.json(newuser);
//  }


function postEmployeeDetails(request, response) {
   const {employeeid, first_name, last_name, full_name, email, mobile, access_right } = request.body
 
   client.query(`INSERT INTO employeedetails (employeeid, first_name, last_name, full_name, email, mobile, access_right)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT DO NOTHING`, 
    [employeeid, first_name, last_name, full_name, email, mobile, access_right], (error, results) => {
     if (error) {
      console.log("postEmployeeDetails ===> ",error);
       throw error
     }
     console.log("result of post user details in postEmployeeDetails == ", results);
     response.status(200).send(`Employee added with ID: ${results.id}`)
   })
   
 }

function getEmployeeDetails(req, res){
   // res.send(employeeDetailsModel);
   client.query('SELECT * FROM employeedetails', (error, results) => {
      if (error) {
        throw error
      }
      // req.status(200).json(results.rows)
      console.log("get employee details : ",results.rows);
      res.send(results.rows);
    })
}



 function getIndividualEmployee(req, res){
   const id = parseInt(req.params.id)

   client.query('SELECT * FROM employeedetails WHERE id = $1', [id], (error, results) => {
     if (error) {
       throw error
     }
   //   response.status(200).send(`User deleted with ID: ${id}`)
   res.send(results.rows);
   })
 }

//  function getIndividualEmployee(req, res){
// {
//    const employee_id = +req.params.employee_id;
//     const user = employeeDetailsModel[employee_id-1];
//     if(user){
//        res.status(200).json(user);
//     }else{
//        res.status(404).json({
//           error:"User does not exist"
//        });
//     }
//  }

function deleteEmployeeDetails(req, res){
  client.query(`DROP TABLE employeeattendance,employeedetails`,(error, results) =>{
    if (error) {
      throw error
    }
  })
}

function copyAttendancetable(){
  console.log("copyAttendancetable function is called");
  client.query(
    `COPY employeeattendance(attendance_id,id,employeeid, date,login_time,logout_time)
  FROM '/Users/darios/Assignment-4-Employee/server/src/models/employeeattendanceid.csv'
  
  DELIMITER ','
  CSV HEADER`,
    (error, res) => {
      if (!error) {
        console.log("employeeAttendancecsv:", res.rows);
      } else {
        console.log("employeeAttendancecsvError :", error.message);
      }
    }
  );
}
 module.exports = {
    postEmployeeDetails,
    getEmployeeDetails,
    getIndividualEmployee,
    deleteEmployeeDetails,
    copyAttendancetable
 }