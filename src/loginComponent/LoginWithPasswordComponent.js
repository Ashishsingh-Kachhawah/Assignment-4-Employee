import React from "react";
import { useState } from "react";
import countryCodes from '../loginComponent/CountryCodes.json'; 
import store from "../store/store";
import OTPViewModal from "../PortalComponent/otpPortalSubview";
import ForgotPasswordPortal from "../PortalComponent/forgotPasswordSubview";
import { loginAction } from "../store/root-reducer";
import { useSelector, useDispatch } from 'react-redux';
import { resources } from "../Utility/StringResource";

const LoginWithPassword = (props) =>{

  const dispatch = useDispatch();
 
  console.log("store state value = ",store.getState());
  // INITIALIZE ALL STATE HERE
  const [countryCode, setCountryCode] = useState();
  const [InputIsNumber, setInputIsNumber] = useState(false);
  const [email, setemail ] = useState();
  const [password, setpassword ] = useState();
  const [IsLoginWithPassword, setIsLoginWithPassword] = useState(true)
  const [showModal, setshowModal] = useState(false);
  const [otpShowModal, setotpShowModal] = useState(false);
  const [hideErrorLabel, setHideErrorLabelValue] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);


    function handleChangeEmail(event) {
    //TO CHECK INPUT TYPE EITHER EMAIL OR PHONE NUMBER
    isNaN(event.target.value) ? setInputIsNumber(false) : setInputIsNumber(true);
    
    console.log("email value is = ", event.target.value);

    // don't remember from where i copied this code, but this works.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(event.target.value)) {
      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
      setIsEmailValid(true);
      setemail(event.target.value);
      dispatch({ type: 'INPUTNUMBER_VALUE', InputIsNumber: InputIsNumber });

      let userName = document.getElementById("emailInput").value;

      // USING REDUX STORE
      dispatch({ type: 'EMAIL_VALUE', email: userName });
    }
    else {
      // invalid email, maybe show an error to the user.
      // alert("Please enter the valid email")
      setIsEmailValid(false); 
      setemail(event.target.value);
      console.log("Please enter the valid email");
    }

    console.log("InputIsNumber=---", InputIsNumber);
    if(InputIsNumber == true){
      setIsEmailValid(true);
    }

  }
  
    const handleChangePassword = (event) => {
      setpassword( event.target.value )
       // USING REDUX STORE
       dispatch({type: 'PASSWORD_VALUE', password: event.target.value })
    }
  
    const onChangeCountryCode = (e) => {
      setCountryCode(e.target.value)
      dispatch({type: 'COUNTRYCODE_VALUE', countryCode: e.target.value});
      console.log("CounteryCode======> ",e.target.value);
    }

    const handleShow = () => {
      setshowModal(true);
       // USING REDUX STORE
      //  store.dispatch({type: 'SHOWMODAL_VALUE', showModal: true })
    }
  
    const  handleHide = () => {
      setshowModal(false);
    }
  
    const handleOtpHide = () => {
      setotpShowModal(false);
    }

    const  LoginWithAccessPinBtnAction = () => {
      setIsLoginWithPassword(false);
      store.dispatch({type: 'ISLOGINWITHPASSWORD_VALUE', IsLoginWithPassword: true })
    }
   
    // ACTION ON LET GO BUTTON CLICK
    // FOR SAGA 
    const  letGoButtonAction_saga = () => {
      console.log("letGoButtonAction_saga action");
      // THIS FUNCTION IS PRESENT IN REDUCER OF REDUX
      dispatch(loginAction())
    } 
    console.log("store.getState().reducer.hideErrorLabel ---", store.getState().reducer.hideErrorLabel);

    return(
      <>
     
      <div className="submainView">
      
             <h1 className='h1'>{resources.LOGIN.WE_ARE_HAPPY_HEADING}</h1>
             {/* <form autocomplete="off"> */}
             {/* <div className="buttonView">
               <button className="mainViewButton">
                <img src="../Images/google.svg" width="30" alt='dummyPic' /> 
                 </button>
               <button className="mainViewButton">
                <img src="../Images/linkedin.svg" width="30" alt="dummyPic" /> 
                </button>
               <button className="mainViewButton">
                <img src="../Images/outlook.svg" width="30" alt="dummyPic" /> 
                </button>
             </div> */}
             <div className="buttonView">
             <button id='googlebtn' class="btn btn-default" >
              <img src="../Images/google.svg" width="30" />
            </button>

            <button id="Linkdinbtn" class="btn btn-default" >
              <img src="../Images/linkedin.svg" width="30" />
            </button>

            <button id='outlookbtn' class="btn btn-default" >
              <img src="../Images/outlook.svg" width="30" />
            </button>
            </div>
            <br></br>
             {/* <div className='ssoContainer'>
               <label className="ssoLabelClass">{resources.LOGIN.SSO_COMING_SOON}</label>
               <hr className="underline" />
             </div> */}
             <label className='stylErrorLabel' hidden={store.getState().reducer.hideErrorLabel ? true : false}>{resources.LOGIN.INVALID_EMAIL_OR_PWD}</label>
              <br />
             <h6>{resources.LOGIN.SSO_COMING_SOON}</h6>
             <div className="emailcontainer">

               <div className="emailphonelabel"> {resources.LOGIN.EMAIL_OR_PHONE_LABEL} </div>

               <div className="stylEmailDiv">

               {InputIsNumber ? (<select className="stylSelectDiv" value={countryCode} 
               onChange={onChangeCountryCode}>
                {/* store.dispatch({type: 'COUNTRYCODE_VALUE', countryCode: event.target.value })}> */}
                 {countryCodes.map(item => {
                   return (<option>
                     <div key={item.name}>
                       {item.name} {item.dial_code}
                     </div>
                   </option>)
                 })}
               </select>) : null}
               <input placeholder= {resources.LOGIN.EMAIL_OR_PHONE} type="email"  id="emailInput" 
               value={email} onChange={handleChangeEmail}/> 
                 </div> 
                 {/* Only visible when email is invalid */}
              <label className="stylInvalidEmailLabel" hidden={isEmailValid ? true : false}>{resources.LOGIN.INVALID_EMAIL_LABEL}</label>          
             </div>
             <div className="passwordcontainer">
               <div className="emailphonelabel"> {resources.LOGIN.PASSWORD_LABEL} </div>
               <input placeholder="xxxxxxxxxxxxx" type="password"  
               value={password} onChange={handleChangePassword}/>
             </div>
             
             <div className='remembercontainer'>
               <label className="rememberlabel">
                 <input className="checkbox" type="checkbox" />
                {resources.LOGIN.REMEMBER_ME}
               </label>
             </div>
             <div className="otpandforgotpPWcontainer">
               <div>
               <button className="otpviewBtton" id="loginwithotpbutton" 
               onClick={() => props.handleLoginWithPassword(false)}> {resources.LOGIN.LOGIN_WITH_ACCESS_PIN} </button>
               </div>
               <div >
                     <button className="otpviewBtton" id="forgotpasswordbutton" onClick={handleShow}>{resources.LOGIN.FORGOT_PASSWORD}</button>
                     {showModal &&
                     <ForgotPasswordPortal showModal={showModal} otpShowModal={false}  handleHide={handleHide}/>}
                       <OTPViewModal handleOtpHide={handleOtpHide} />
               </div>
             </div>
             <div className="submitbuttoncontainer">
               <button id="letsgobutton" className = {(email === '' || password === '')? 'letGoButtonDisable' : 'letGoButtonEnable'} 
                disabled={(email === '') || (password === '')} onClick={letGoButtonAction_saga} > {resources.LOGIN.LETS_GO} </button>
             </div>
             
             {/* </form> */}
           </div>
           
 
     </>
    )
}

export default LoginWithPassword;