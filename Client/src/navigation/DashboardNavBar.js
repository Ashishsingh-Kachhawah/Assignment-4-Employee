import React from "react";
import * as audio from "../DashBoardComponent/Sounds";

const loggedIn = window.localStorage.getItem("isLoggedIn")
 console.log("loggedIn ==========", loggedIn)   
const DashboardNavBar = () => {

      // this.forceUpdate();



  const handleTest = () => {
    console.log("handleTest logout btn clicked here");
    audio.Error.play()
    //In Logout func ---
    // deleteUserAttendanceDetails()
    // deleteUserDetails();
           window.localStorage.removeItem("isLoggedIn");
           window.localStorage.removeItem("bearerToken");
           window.location.href = "/";
  }

  return (
    <React.Fragment>
      <nav className="DashboardNavBar">
        <div id="imgcontainer">
          <img id="imglogo" src="../Images/Uclogo.png" alt="dummyPic0" width={170} />
        </div>
        <div className="logoutdiv">

        <div className = "LogoutStyl">
        <button type="button" onClick={handleTest} id="logoutbtn" class="btn btn-light">
        <img src="../Images/logoutimg.png" alt="dummypic" width="30" />
        </button>
        
        <label class="hide">LOGOUT</label>
        </div>
       
        </div>
      </nav>

</React.Fragment>
   
  )
};

function deleteUserDetails(){
  console.log("deleteUserDetails");
  
      fetch("http://127.0.0.1:3002/employeedetails",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3002"
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("deleteUserDetails response = ", data);
      })
      .catch((error) => {
        console.log("Error deleteUserDetails = ",error);
      })
  
  }

  function deleteUserAttendanceDetails(){
    console.log("deleteUserAttendanceDetails");
    
        fetch("http://127.0.0.1:3002/employeeattendance",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3002"
          },
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("deleteUserAttendanceDetails response = ", data);
        })
        .catch((error) => {
          console.log("Error deleteUserAttendanceDetails = ",error);
        })
    
    }
    
export default DashboardNavBar;