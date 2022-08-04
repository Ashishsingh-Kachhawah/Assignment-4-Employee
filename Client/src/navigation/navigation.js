
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { resources } from '../Utility/StringResource';
import { secretResources } from '../Utility/secretKeysStrings';
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
        client_id = secretResources.LOGIN.CLIENT_ID_PRESTG
        client_secret = secretResources.LOGIN.CLIENT_SECRET_PRESTG
        break;

      case "staging":
        client_id = secretResources.LOGIN.CLIENT_ID_STG
        client_secret = secretResources.LOGIN.CLIENT_SECRET_STG
        break;

      case "preproduction":
        client_id = secretResources.LOGIN.CLIENT_ID_PREPRO
        client_secret = secretResources.LOGIN.CLIENT_SECRET_PREPRO
        break

      case "reactwork":
        client_id = secretResources.LOGIN.CLIENT_ID_PRO
        client_secret = secretResources.LOGIN.CLIENT_SECRET_PRO
        break;
    }

    console.log("for testing purpose");
    // STORE VALUE IN REDUX
    dispatch({type: 'CLIENT_ID', client_id: client_id })
    dispatch({type: 'CLIENT_SECRET', client_secret: client_secret})

  }

    const handleTest = () => {
      audio.Error.play()
    }
  return (
    <React.Fragment>
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
  </React.Fragment>
  )
}
 
export default Navigator;