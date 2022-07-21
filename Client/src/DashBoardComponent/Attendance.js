import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import employeeList from './MockResponse';
import SideDrawer from './SideBar';
import '../cssComponents/Dashboard.css'
// import * as audio from './Sounds'

export default function Attendance() {
  const [employeeIndex, setemployeeIndex] = useState();
  console.log("index set sideBar ====", employeeIndex);
  const [localemployeelist, setlocalemployeelist] = useState(employeeList);
  console.log(employeeList);
  const [isAdmin, setisAdmin] = useState(true);

  useEffect(() => {
    console.log("UseEffect")
  }, [localemployeelist]);

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>employeeId</th>
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
          <td>{row.employeeId}</td>
          <td>{row.LogIn}</td>
          <td>{row.LogOut}</td>
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
    updatedItems.push(employeeList[index]); 
    setlocalemployeelist(updatedItems);
    console.log("Upadates List ",updatedItems);
  }
  console.log(localemployeelist);
  
   console.log("Side bar employee Index==== ",employeeIndex)
  return (
    <React.Fragment>
      <div className='MainAttendanceContainer'>
        <div className={(isAdmin == true) ? 'UserListAdmin' : 'UserListNoramlUser' }>
        {isAdmin &&  
          <SideDrawer setIndex={setIndex} />}
        </div>
        <div className={(isAdmin == true) ? 'AttendanceTableAdminUser' : 'AttendanceTableNormalUser' }>

          <Table id='AttendanceData'  className="table table-dark table-striped" size="sm" >

            <TableHeader />
          <TableBody />

          </Table>
        </div>
      </div>

    </React.Fragment>
  )
}
