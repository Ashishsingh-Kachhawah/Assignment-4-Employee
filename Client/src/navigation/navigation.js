
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { resources } from '../Utility/StringResource';
import * as audio from "../DashBoardComponent/Sounds";
// import store from '../store/store';
// import  store  from "../store/store";
import '../cssComponents/App.css';
 
const loggedIn = window.localStorage.getItem("isLoggedIn")
 console.log("loggedIn ==========", loggedIn)   
 const Navigator=(props)=>{

  const dispatch = useDispatch();

  const [environment, setEnvironment] = useState("prestaging");
  // SET VALUE OF STATE ENVIRONMENT 
 const handleChange = (event) => {
    setEnvironment(event.target.value)
    console.log("environment = ",environment);
    dispatch({type: 'ENVIRONMENT_VALUE', environment:event.target.value })

    let client_id, client_secret;
    switch (event.target.value) {

      case "prestaging":
        client_id = "WeX4CwNQeMwX14tQ2NJ5j53TwPSh6Lx-YbpbH98nsUM"
        client_secret = "rFCiEGumO_4lY3XBZdo0KLCQLsWAvasDLwtSIpKDWn8"
        break;

      case "staging":
        client_id = "wPHcNxiPuvyRPefzoW7mNnL3zimb6N4RdxyJCjCOlcc"
        client_secret = "BRGrR4i9dmUuGuV4szoLqqa4N3oHYhiRjFYiTC1tThk"
        break;

      case "preproduction":
        client_id = "Io2GP8CjMJHejQLr4dKh6ZTxld-SzIRtWX6U2uncZQ0"
        client_secret = "MRcet1zk5iv2mtMn2l969u-Fdv5k3sDTxFjIGRAJfio"
        break

      case "reactwork":
        client_id = "Io2GP8CjMJHejQLr4dKh6ZTxld-SzIRtWX6U2uncZQ0"
        client_secret = "MRcet1zk5iv2mtMn2l969u-Fdv5k3sDTxFjIGRAJfio"
        break;
    }

    console.log("");
    // STORE VALUE IN REDUX
    dispatch({type: 'CLIENT_ID', client_id: client_id })
    dispatch({type: 'CLIENT_SECRET', client_secret: client_secret})

  }

    const handleTest = () => {
      audio.Error.play()
    }
  return (
    <>
    <nav>
    <div id="imageContainer">
      <img src="../Images/utilizecoreLogo.png" alt="dummyPic" width={200} />
    </div>
    <div>
      <select name="selectEnvironment" id="selectEnvironment" value={environment} onChange={handleChange} >
        <option value="staging">{resources.NAVIGATION.STAGING}</option>
        <option value="prestaging">{resources.NAVIGATION.PRE_STAGING}</option>
        <option value="preproduction">{resources.NAVIGATION.PRE_PRODUCTION}</option>
        <option value="reactwork">{resources.NAVIGATION.PRODUCTION}</option>
      </select>
    </div>
    {/* <div >
    <button type="button" onClick={handleTest} id="logoutbtn" class="btn btn-light">
        <img src="../Images/logoutimg.png" alt="dummypic" width="30" />
        </button>
        </div> */}
  </nav>
    </>
  )
}
 
export default Navigator;