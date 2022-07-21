const employeeAttendanceModel = require("../models/employeeAttendance.model")

const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Admin@123",
    database: "postgres"
})

client.connect();

client.query(`CREATE TABLE employeeattendance(
   attendance_id INT GENERATED ALWAYS AS IDENTITY,
   id INT,
   date TIMESTAMPTZ NOT NULL,
   login_time TIMESTAMPTZ NOT NULL,
   logout_time TIMESTAMPTZ NOT NULL,
   PRIMARY KEY(attendance_id),
   CONSTRAINT fk_employee
      FOREIGN KEY(id) 
	  REFERENCES employeedetails(id)
)`,(error, res) =>{
   if(!error){
      console.log("employeeAttendance:",res.rows);
   }else{
       console.log("employeeAttendanceError :",error.message);
   }
   client.end;})

// function postEmployeeAttendance(req, res){

//     if(!req.body.employee_id){
//       return res.status(400).json({
//           error: 'Missing employee id'
//        });
//     }

//     const newuser = {
//        employee_id: req.body.employee_id,
//        date: new Date(req.body.date*1000),
//        login_time: new Date(req.body.login_time*1000),
//        logout_time: new Date(req.body.logout_time*1000),
//     };
 
//     employeeAttendanceModel.push(newuser);
    
//     res.json(newuser);
//  }


function postEmployeeAttendance(req, res){
   const {id, date, login_time, logout_time} = req.body
 console.log("postEmployeeAttendance req.body", req.body);
   client.query('INSERT INTO employeeattendance(id, date, login_time, logout_time) VALUES ($1, $2, $3, $4)', [id, date, login_time, logout_time], (error, results) => {
     if (error) {
      console.log("postEmployeeAttendance ===> ",error);
       throw error
     }
     res.send(`EmployeeAttendance added with ID: ${results.attendance_id}`)
   })
}

 function getEmployeeAttendance(req, res){
   //  res.send(employeeAttendanceModel);

   client.query('SELECT * FROM employeeattendance ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      // req.status(200).json(results.rows)
      console.log("get employee attendance : ",results.rows);
      res.send(results.rows);
    })

 }

//  function getIndividualEmployeeAttendance(req, res){
//    const timestamp = Math.round(new Date().getTime()/1000)
//    console.log("timestamp: ",timestamp);
//    const date = new Date(timestamp*1000);
//    console. log(date. toLocaleDateString("en-US"));
//    var hours = date.getHours();
// var minutes = date.getMinutes();
// var newformat = date.getHours() >= 12 ? 'PM' : 'AM'; 
// // Find current hour in AM-PM Format 
// hours = hours % 12;  

// // To display "0" as "12" 
// hours = hours ? hours : 12;  
// minutes = minutes < 10 ? '0' + minutes : minutes;  
// var formatted = 
//     ('0' + date.getHours()).slice(-2)
//     + ':' + ('0' + date.getMinutes()).slice(-2)
//     + ' ' + newformat;
// console.log("formatted : ", formatted);


//    const employee_id = +req.params.employee_id;
//     const user = employeeAttendanceModel[employee_id-1];
//     if(user){
//        res.status(200).json(user);
//     }else{
//        res.status(404).json({
//           error:"User does not exist"
//        });
//     }
//  }

function getIndividualEmployeeAttendance(req, res){
   const id = parseInt(req.params.id)

   client.query('SELECT * FROM employeeattendance WHERE id = $1', [id], (error, results) => {
     if (error) {
       throw error
     }
     console.log("get individual employee attendance : ",results.rows);
   res.send(results.rows);
   })
 }


 function patchEmployeeAttendance(req, res){
   // const employeeAttendance = employeeAttendanceModel.find(employee => employee.employee_id === parseInt(req.params.employee_id));
//    let employeeAttendance = [];
//     client.query('SELECT * FROM employeeattendance ORDER BY id ASC', (error, results) => {
//       if (error) {
//         throw error
//       }
//       console.log("get employee attendance patchEmployeeAttendance: ",results.rows);
//       employeeAttendance = results.rows;
//       // res.send(results.rows);
//     })
//   console.log("employeeAttendance = ",employeeAttendance);
//    if (!employeeAttendance) return res.status(404).json({ message: 'Not Found' });
   
//    employeeAttendance.login_time = req.body.login_time;
//    employeeAttendance.logout_time = req.body.logout_time;
//    employeeAttendance.date = req.body.date;
//    employeeAttendance.id = req.body.id;

   // res.json(employeeAttendance);

    const attendance_id = parseInt(req.params.attendance_id)
  const {id, date, login_time, logout_time } = req.body

  client.query(
    'UPDATE employeeattendance SET id = $1, date = $2, login_time = $3, logout_time = $4 WHERE attendance_id = $5',
    [id, date, login_time, logout_time, attendance_id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Employee attendance modified with ID: ${attendance_id}`)
    }
  )

 }

 module.exports = {
    postEmployeeAttendance,
    getEmployeeAttendance,
    getIndividualEmployeeAttendance,
    patchEmployeeAttendance
 }