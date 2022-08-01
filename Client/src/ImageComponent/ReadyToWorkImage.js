import React from "react";

const ReadyToWork = () => {
  
const loggedIn = window.localStorage.getItem("isLoggedIn");
  return (
    <React.Fragment>
      <div className="readyToWorkContainer"  hidden={loggedIn ? true : false}>
        <img src="../Images/readytowork.png" alt="dummyPic" width={400} />
      </div>
      </React.Fragment>
  )
}
export default ReadyToWork;