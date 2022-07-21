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
client.query(`CREATE  TABLE IF NOT EXISTS employeedetails(employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(250),
    last_name VARCHAR(250),
    full_name VARCHAR(250),
    email VARCHAR(250),
    mobile Integer,
    access_right VARCHAR(250)
    )`, (error, res) =>{
    if(!error){
       console.log(res.rows);
    }else{
        console.log(error.message);
    }
    client.end;
})
// client.query('Select * from employee', (error, res) =>{
//     if(!error){
//        console.log(res.rows);
//     }else{
//         console.log(error.message);
//     }
//     client.end();
// })
