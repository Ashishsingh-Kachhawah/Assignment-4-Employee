import { useState } from 'react';
import countryCodes from '../loginComponent/CountryCodes.json'; 
// import { store } from '../store/store';
import store from "../store/store";
import ForgotPasswordModalView from './ForgotPassowrdPortalView';
import OTPViewModal from './otpPortalSubview';
import { useSelector, useDispatch } from 'react-redux';
import { resources } from '../Utility/StringResource';

  const ForgotPasswordPortal = (props) => {

    const userEmail = useSelector(state => state.reducer.email);
    console.log("useSelector -- ",userEmail);

    const access_token = useSelector(state => state.reducer.accessToken);
    console.log("access_token = ",access_token);

  console.log("ForgotPasswordPortal_password = ",store.getState().reducer.password);
  // INITIALIZE ALL STATE HERE
  const [countryCode, setCountryCode] = useState();
  const [InputIsNumber, setInputIsNumber] = useState(false);
  const [email, setemail ] = useState();
  const [otpShowModal, setotpShowModal] = useState(false);

  const  handleChangeEmail = (event) => {
    //TO CHECK INPUT TYPE EITHER EMAIL OR PHONE NUMBER
    isNaN(event.target.value) ?  setInputIsNumber(false )  :   setInputIsNumber( true )
    console.log("email value is = ",event.target.value);
    setemail( event.target.value );
  }

  const handleOtpHide = () => {
    setotpShowModal( false);
  }
  const sendCodeAction = () => {
    console.log("before split username = ",document.getElementById("emailInput").value);
    let userName = email;
    if (InputIsNumber) {
      let splitArr = countryCode.split(" ");
      if (splitArr && splitArr.length > 1) {
        userName = splitArr[1] + email;
      }
    }

    console.log("userName = ",userName);
    // CREATE BODY STRUCTURE
    let data;
    if (InputIsNumber) {
      data = {
        "recipient_type": "phone_number",
        "recipient_value": userName,
        "otp_for": "sign_in"
      }
    } else {
      data = {
        "recipient_type": "email",
        "recipient_value": userName,
        "otp_for": "sign_in"
      }
    }

    console.log("body = ", data);
    // USE FETCH METHOD
    fetch("/api/v2/users/send_otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response data = ", data);
        // this.setState({ otpShowModal: true });
        setotpShowModal(true);
      });
      
  }
  // PORTAL FOR FORGOT PASSWORD
  const modalforforgotpw = props.showModal  && !props.otpShowModal?  (

    <ForgotPasswordModalView>

      <div className="forgotPasswordmodal">

        <div className="popup">
          <button id='btncancel' onClick={() => props.handleHide(false)}>
            <img src="../Images/DeleteIcon.png" width="20" />
          </button>

          <h1> {resources.FORGOT_PASSWORD_PORTAL.FORGOT_YOUR_PASSWORD}</h1>

          <p className='lblotp'>{resources.FORGOT_PASSWORD_PORTAL_PLEASE_ENTER_EMAIL}</p>
          <div className="emailcontainer">
            <div className="emailphonelabel"> {resources.LOGIN.EMAIL_OR_PHONE_LABEL} </div>
            <div className="stylEmailDiv">
            {InputIsNumber ? (<select className="stylSelectDiv" value={countryCode} 
            onChange={(e) => setCountryCode(e.target.value)}>
              {countryCodes.map(item => {
                return (<option>
                  <div key={item.name}>
                    {item.name} {item.dial_code}
                  </div>
                </option>)
              })}
              </select>) : null}
              <input placeholder={resources.LOGIN.EMAIL_OR_PHONE} type="text" id="emailInput"
               value={email} onChange={handleChangeEmail} />
            </div>
          </div><br></br> 
                    
          <div>

            <button id="sendCode" className={(email === '') ? 'letGoButtonDisable' : 'letGoButtonEnable'}
              disabled={(email === '')} onClick={sendCodeAction} > {resources.LOGIN.SEND_CODE} </button>
              <OTPViewModal email = {email} otpShowModal= {otpShowModal} handleOtpHide={handleOtpHide}/>
              </div>
        </div>
      </div>
    </ForgotPasswordModalView>
) : null;
return(
    <>
        {modalforforgotpw}
    </>
)
 }

 export default ForgotPasswordPortal;