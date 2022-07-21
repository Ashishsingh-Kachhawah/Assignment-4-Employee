const employeeLocationModel = require("../models/employeeLiveLocation.model")

function postEmployeeLocation(req, res){

    if(!req.body.employee_id){
      return res.status(400).json({
          error: 'Missing employee id'
       });
    }

    const newEmployeeLocation = {
       employee_name: req.body.employee_name,
       employee_id: req.body.employee_id,
       lat: req.body.lat,
       lng : req.body.lng,
       route: req.body.route
    };
 
    employeeLocationModel.push(newEmployeeLocation);
    
    res.json(newEmployeeLocation);
 }

 function getEmployeeLocation(req, res){
    res.send(employeeLocationModel);
 }

 function getIndividualEmployeeLocation(req, res){

   const employee_id = +req.params.employee_id;
    const user = employeeLocationModel[employee_id-1];
    if(user){
       res.status(200).json(user);
    }else{
       res.status(404).json({
          error:"User does not exist"
       });
    }
 }

 function patchEmployeeLocation(req, res){
   const employeeLocation = employeeLocationModel.find(employee => employee.employee_id === parseInt(req.params.employee_id));
   if ( employeeLocation) return res.status(404).json({ message: 'Not Found' });
   
 employeeLocation.employee_name = req.body.employee_name;
 employeeLocation.employee_id = req.body.employee_id;
 employeeLocation.lat = req.body.lat;
 employeeLocation.Lng = req.body.lng;
 employeeLocation.route = req.body.route


   res.json (employeeLocation);
 }

 module.exports = {
    postEmployeeLocation,
    getEmployeeLocation,
    getIndividualEmployeeLocation,
    patchEmployeeLocation
 }