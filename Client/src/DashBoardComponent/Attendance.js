import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import employeeList from './MockResponse';
import SideDrawer from './SideBar';
import '../cssComponents/Dashboard.css'
// import * as audio from './Sounds'

var employeeAttendanceArray = [];
const getEmployeeattendance = () => {
  console.log("employeeattendance");
  fetch("http://127.0.0.1:3002/employeeattendance",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3002"
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("response data getEmployeeattendance = ", data);
        employeeAttendanceArray = data;
        // window.localStorage.setItem("employeeDetails", data);
        console.log("response data getEmployeeattendance => ",employeeAttendanceArray);
      })
      .catch((error) => {
        console.log("Error sidebar.js getEmployeeattendance= ",error);
      })
}

export default function Attendance(props) {
  const [employeeIndex, setemployeeIndex] = useState();
  console.log("index set sideBar ====", employeeIndex);
  getEmployeeattendance();
  const [localemployeelist, setlocalemployeelist] = useState(employeeAttendanceArray);
  console.log(employeeList);
  const [isAdmin, setisAdmin] = useState(true);

  useEffect(() => {
    console.log("UseEffect")
  }, [localemployeelist]);

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>EmployeeId</th>
          <th>LogIn</th>
          <th>LogOut</th>
        </tr>
      </thead>
    )
  }

  const TableBody = () => {
    console.log("Table Body ", localemployeelist);
    const rows = localemployeelist.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.id}</td>
          <td>{row.login_time}</td>
          <td>{row.logout_time}</td>
        </tr>
      )
    })

    return <tbody>{rows}</tbody>
  }
  const setIndex = index => {
    console.log("side drawer index", index)
    setemployeeIndex(index);
    // const updatedItems = employeeList.filter(index);
    var updatedItems = [];
    updatedItems.push(employeeAttendanceArray[index]); 
    setlocalemployeelist(updatedItems);
    console.log("Upadates List ",updatedItems);
  }
  console.log(localemployeelist);
  
   console.log("Side bar employee Index==== ",employeeIndex)
  return (
    <React.Fragment>
      <div className='MainAttendanceContainer'>
        <div className={(props.userIsAdmin == true) ? 'UserListAdmin' : 'UserListNoramlUser' }>
        {props.userIsAdmin &&  
          <SideDrawer setIndex={setIndex} />}
        </div>
        <div className={(props.userIsAdmin == true) ? 'AttendanceTableAdminUser' : 'AttendanceTableNormalUser' }>

          <Table id='AttendanceData'  className="table table-dark table-striped" size="sm" >

            <TableHeader />
          <TableBody />

          </Table>
        </div>
      </div>

    </React.Fragment>
  )
}
