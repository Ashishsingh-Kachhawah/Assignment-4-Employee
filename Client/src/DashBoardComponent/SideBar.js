import React from 'react'
// import { bubble as Menu } from 'react-burger-menu';
import '../cssComponents/Dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import employeeList from './MockResponse';
import company_users from './Response';
import * as audio from './Sounds'

var EmployeeListArray = [];

// function GetEmployeeList() {
//   fetch("http://127.0.0.1:3002/employeedetails", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "http://127.0.0.1:3002"
//       },
 
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("response data = ", data);
//        EmployeeListArray = JSON.stringify(data);
//         console.log("Clone array"+ EmployeeListArray);
//         // EmployeeListArray = data;
//         // var TempArray = [];
//         // TempArray = data;
//         // EmployeeListArray = TempArray.json();
//         // console.log("!!!!!!!!!!!!!!!!!!"+ EmployeeListArray);
//       })
//       .catch((error) =>{
//         console.log("Unable to login", error);
//       })
// }

var employeeDetailsArray = [];
function getEmployeeDetails(){
  console.log("getEmployeeDetails");
  fetch("http://127.0.0.1:3002/employeedetails",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3002"
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("response data getEmployeeDetails = ", data);
        employeeDetailsArray = data;
        // window.localStorage.setItem("employeeDetails", data);
        console.log("response data employeeDetailsArray => ",employeeDetailsArray);
      })
      .catch((error) => {
        console.log("Error = ",error);
      })
}

const Emplyoyeenamelist = (props) =>{
  // console.log("window.localStorage.getItem ==>",window.localStorage.getItem("employeeDetails"));
  if(employeeDetailsArray.length === 0){
    getEmployeeDetails();
  }
  if(employeeDetailsArray.length > 0){
    const rows = employeeDetailsArray.map((rows, index) => {
      // console.log("Printing Rows", rows)
        return(
            <tr key={index}>
                <td onClick={() =>{{ props.setIndex(index)} {audio.SelectClick.play()}} }>{rows.full_name}</td>
            </tr>
        )
    })
    return <tbody>{rows}</tbody>
  }
   
}
const UserHeader = () => {
    return (
      <thead>
        <tr>
          <th>User Name :</th>
        </tr>
      </thead>
    )
  }

export default function SideDrawer(props){
  
    // console.log(Emplyoyeenamelist);
  const { setIndex } = props;
  
    return (
        <React.Fragment>
       <div className="sidenav">
        <Table className="table table-dark table-striped" size="sm">
        <UserHeader />
        <Emplyoyeenamelist setIndex={setIndex}  />
        </Table>
        
      
</div> 
</React.Fragment>
    );
  };
