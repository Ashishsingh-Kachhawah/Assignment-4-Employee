import React from "react";
import { useState , useEffect} from "react";
import countryCodes from '../loginComponent/CountryCodes.json'; 
import store from "../store/store";
import OTPViewModal from "../PortalComponent/otpPortalSubview";
import ForgotPasswordPortal from "../PortalComponent/forgotPasswordSubview";
import { loginAction } from "../store/root-reducer";
import {useDispatch , connect} from 'react-redux';
import { resources } from "../Utility/StringResource";
import {useNavigate} from 'react-router-dom';

const LoginWithPassword = (props) =>{

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // INITIALIZE ALL STATE HERE
  const [countryCode, setCountryCode] = useState();
  const [InputIsNumber, setInputIsNumber] = useState(false);
  const [email, setemail ] = useState();
  const [password, setpassword ] = useState();
  const [IsLoginWithPassword, setIsLoginWithPassword] = useState(true)
  const [showModal, setshowModal] = useState(false);
  const [otpShowModal, setotpShowModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  

    function handleChangeEmail(event) {
      store.dispatch({type: 'HIDE_ERROR_LABEL' , hideErrorLabel : true});

    //TO CHECK INPUT TYPE EITHER EMAIL OR PHONE NUMBER
    isNaN(document.getElementById("emailInput").value) ? setInputIsNumber(false) : setInputIsNumber(true);
    
    let userName = document.getElementById("emailInput").value;

    // don't remember from where i copied this code, but this works.
    let emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailFormat.test(event.target.value)) {
      // this is a valid email address
      setIsEmailValid(true);
      setInputIsNumber(false);
      // USING REDUX STORE
    }
    else {
      // invalid email, maybe show an error to the user.
      // alert("Please enter the valid email")
      setIsEmailValid(false); 
    }
    setemail(event.target.value);
    dispatch({ type: 'INPUTNUMBER_VALUE', InputIsNumber: InputIsNumber });
    dispatch({ type: 'EMAIL_VALUE', email: userName });
    if(InputIsNumber === true){
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
    const letGoButtonAction_saga = () => {
      // THIS FUNCTION IS PRESENT IN REDUCER OF REDUX
      // props.loginAction()
      dispatch(loginAction()); 
      
     } 

  
   useEffect(() => {
   if(props.accessToken && props.accessToken !== ""){
          window.location.reload();

    navigate('/Dashboard' , {replace: false});
      } 
    },[props.accessToken]);

    return(
      <>
      <div className="submainView">
             <h1 className='h1'>{resources.LOGIN.WE_ARE_HAPPY_HEADING}</h1>
             <div className="buttonView">
             <button id='googlebtn' class="btn btn-default" >
              <img src="../Images/google.svg"  alt="googlebtn" width="30" />
            </button>

            <button id="Linkdinbtn" class="btn btn-default" >
              <img src="../Images/linkedin.svg" alt="Linkdinbtn"  width="30" />
            </button>

            <button id='outlookbtn' class="btn btn-default" >
              <img src="../Images/outlook.svg" alt="outlookbtn" width="30" />
            </button>
            </div>
            <br></br>
             <label className='stylErrorLabel' hidden={store.getState().reducer.hideErrorLabel ? true : false}>{resources.LOGIN.INVALID_EMAIL_OR_PWD}</label>
              <br />
             <h6>{resources.LOGIN.SSO_COMING_SOON}</h6>
             <div className="emailcontainer">

               <div className="emailphonelabel"> {resources.LOGIN.EMAIL_OR_PHONE_LABEL} </div>

               <div className="stylEmailDiv">

               {InputIsNumber ? (<select className="stylSelectDiv" value={countryCode} 
               onChange={onChangeCountryCode}>
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

//LISTENER FROM SAGA
const mapStateToProps = state => ({
  accessToken : state.reducer.tokenReceived,
  // userRole : state.getRoleApiReducer,
  
});

export default connect(mapStateToProps)(LoginWithPassword);


