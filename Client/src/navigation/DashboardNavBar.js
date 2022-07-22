import React from "react";
import * as audio from "../DashBoardComponent/Sounds";

const loggedIn = window.localStorage.getItem("isLoggedIn")
 console.log("loggedIn ==========", loggedIn)   
const DashboardNavBar = () => {

      // this.forceUpdate();



  const handleTest = () => {
    audio.Error.play()
    //In Logout func ---
           window.localStorage.removeItem("isLoggedIn");
           window.localStorage.removeItem("bearerToken");
           window.location.href = "/";
  }

  return (
    <>
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


    </>
  )
};

export default DashboardNavBar;