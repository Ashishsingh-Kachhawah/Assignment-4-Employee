const employeeLocationModel = require("../models/employeeLiveLocation.model")

// var mongo = require('mongodb');

const { MongoClient } = require('mongodb');
//Create a database named "mydb":
var url = "mongodb://localhost:27017/Mongodb";

MongoClient.connect("mongodb://localhost:27017/Mongodb", function (err, db) {
  if (err) throw console.log(err);
  console.log("Database created!");
  //   db.close();
});

  console.log("EmployeeLocation Call");

MongoClient.connect(url, function(err, db) {
    if (err) throw console.log(err);
    var dbo = db.db("Mongodb");
    //Create a collection name "customers":
    dbo.createCollection("UserLocations", function(error, res) {
      if (!error) {
        console.log("employeelocationController:", res.rows);
      } else {
        console.log(error.message);
      }
      db.close();
    });
  });
// var DatabaseExists = MongoClient.showdatabase().ToList().Contains("Mongodb");
// if (DatabaseExists == false) {
//   Console.WriteLine("Create Database");
//   // code to create the database here...
// } else {
//   Console.WriteLine("Database Already Exists!!");
// }
// MongoClient.connect(url, function(err, db) {
//     if (err) throw console.log(err);
    
// var collectionExists = db.listCollections.toList().Contains("UserLocations");
// if (collectionExists == false) {
//   Console.log("Create Collection");
//   // code to create the collection here...
// } else {
//   Console.log("Collection Already Exists!!");
// }
// });
// mongoimport --db Mongodb --collection UserLocations --type=csv --
// headerline --file=server/src/models/UserLocations.csv


function postEmployeeLocation(request, response) {
    const { employee_name, employee_id, location, icon } = request.body;
    MongoClient.connect(url, function (err, db) {

        if (err) throw console.log(err);
        var dbo = db.db("Mongodb");
        var userobj = { employee_name, employee_id, location, icon };
        dbo.collection("UserLocations").insertOne(userobj, function (err, res) {
            if (err) {
                console.log("PostEmployeeLocation error ", err)
                throw err
            };
            console.log("1 document inserted");
            db.close();

            console.log("restult of post user details in postEmployeeDetails == ", res);
            response.status(200).send(`Employee added with ID: ${res.employeeid}`)
        })
    })
}

function getEmployeeLocation(request, response) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw console.log(err);
        // res.send(employeeDetailsModel);
        var dbo = db.db("Mongodb");
        dbo.collection("UserLocations").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log("get employee details : ", result);
            response.send(result);
            // response.status(200).json(result.rows)

        });

    })
}

function getIndividualEmployeeLocation(request, response) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw console.log(err);
        var dbo = db.db("Mongodb");
        const id = parseInt(request.params.employee_id);
        console.log("EmployeeId=======", id);
        var query = { employee_id: id };
        dbo.collection("UserLocations").find(query).toArray(function (error, result) {
            if (error) throw error;
            if (result.length > 0) {
                response.status(200).json(result);
            } else {
                response.status(404).json({
                    error: "User does not exist"
                });
                console.log(result);
                db.close();
            }

        })
    }
    )
}
// function patchEmployeeLocation(request, response){
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw console.log(err);
//         var dbo = db.db("Mongodb");
//         const id = parseInt(request.params.employeeid)
//         var myquery = { address: "Valley 345" };
//         var newvalues = { $set: { name: "Michael", address: "Canyon 123" } };
//         dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
//           if (err) throw err;
//           console.log("1 document updated");
//           db.close();
//         }); 
//     })
//      const attendance_id = parseInt(req.params.attendance_id)
//    const {id, date, login_time, logout_time } = req.body
 
//    client.query(
//      'UPDATE employeeattendance SET id = $1, date = $2, login_time = $3, logout_time = $4 WHERE attendance_id = $5',
//      [id, date, login_time, logout_time, attendance_id],
//      (error, results) => {
//        if (error) {
//          throw error
//        }
//        res.status(200).send(`Employee attendance modified with ID: ${attendance_id}`)
//      }
//    )
  

module.exports = {
    postEmployeeLocation,
    getEmployeeLocation,
    getIndividualEmployeeLocation,
    
}