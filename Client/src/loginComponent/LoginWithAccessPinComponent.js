import React from "react";
import { useState } from "react";
import countryCodes from '../loginComponent/CountryCodes.json'; 
import OTPViewModal from "../PortalComponent/otpPortalSubview";
import { resources } from "../Utility/StringResource";
// import OTPViewModal from "../PortalComponent/otpPortalSubview";
// import { store } from "../store/actionRedux";
// import LoginApi from "../APIComponent/LoginApi";

const LoginWithAccessPin = (props) =>{

      // INITIALIZE ALL STATE HERE
  const [countryCode, setCountryCode] = useState();
  const [InputIsNumber, setInputIsNumber] = useState(false);
  const [email, setemail ] = useState();
  const [otpShowModal, setotpShowModal] = useState(false);
    

  const  handleChangeEmail = (event) => {
    //TO CHECK INPUT TYPE EITHER EMAIL OR PHONE NUMBER
    isNaN(event.target.value) ?  setInputIsNumber(false )  :   setInputIsNumber( true )
    setemail( event.target.value );
  }

  const handleOtpHide = () => {
    setotpShowModal( false);
  }

// SEND CODE BUTTON ACTION WHERE WE STRIKE SEND OTP API
  const sendCodeAction = () => {
    let userName = document.getElementById("emailInput").value;
    if (InputIsNumber) {
      let splitArr = this.state.countryCode.split(" ");
      if (splitArr && splitArr.length > 1) {
        userName = splitArr[1] + email;
      }
    }

    // CREATE BODY STRUCTURE
    let data;
    if (InputIsNumber) {
      data = {
        // "g-recaptcha-response" :"03AGdBq26V1QkIWpNItOxTl2W0yvCG9uhB-7I_qVNMR7LLu-DtH2QMDKxj_CIOf-VgDruiR30LIUfucanQ1E7VOG_-0FVUVkeFpPMQ3106Aloo7r60Nl9XNKo0EwMla9wlFRzxRis5NmwNBwoFZagALj4vMjPA0Vej-EZjk0Ek2vk7HVFaht6NueV_2Ku7XfvMRol2DsOXZlgNZ3g3ujIfQX0ADJ54cRGpSb2_B49RZ3Xddg8bCvYIj24ilyLOXjc2e8e5h2o5voE8G0SrZi9FEf1anis2fPLNgIYmZfAahRt5_VXLNHEa8yjzZ2Q9qJ764fsP86FiWGEqJ1HKBVovYS6CO_J0SCspYlTaBaK6B8RkMR41srfVcZlW-iWVfTxJJYMbcFWns96rMH00rq_Si9fySjwy4kCz-wOFhsvCpMBWAMyBGSZwT6mIJeTuo4LinkODwZjprMPQk8S7L3TzzsiNvM4XcycyVlq1HFYuu5ezYxeNB0TzaL9Y6UQ8JQ0wbOyUQ9SEuwCudTzJx0CCIBqbxxCUJaFZL4FChvE3MeDOy7D0qsglboc",
        //  "recipient_name": "",
        "recipient_type": "phone_number",
        "recipient_value": userName,
        "otp_for": "sign_in"
      }
    } else {
      data = {
        // "g-recaptcha-response" :"03AGdBq26V1QkIWpNItOxTl2W0yvCG9uhB-7I_qVNMR7LLu-DtH2QMDKxj_CIOf-VgDruiR30LIUfucanQ1E7VOG_-0FVUVkeFpPMQ3106Aloo7r60Nl9XNKo0EwMla9wlFRzxRis5NmwNBwoFZagALj4vMjPA0Vej-EZjk0Ek2vk7HVFaht6NueV_2Ku7XfvMRol2DsOXZlgNZ3g3ujIfQX0ADJ54cRGpSb2_B49RZ3Xddg8bCvYIj24ilyLOXjc2e8e5h2o5voE8G0SrZi9FEf1anis2fPLNgIYmZfAahRt5_VXLNHEa8yjzZ2Q9qJ764fsP86FiWGEqJ1HKBVovYS6CO_J0SCspYlTaBaK6B8RkMR41srfVcZlW-iWVfTxJJYMbcFWns96rMH00rq_Si9fySjwy4kCz-wOFhsvCpMBWAMyBGSZwT6mIJeTuo4LinkODwZjprMPQk8S7L3TzzsiNvM4XcycyVlq1HFYuu5ezYxeNB0TzaL9Y6UQ8JQ0wbOyUQ9SEuwCudTzJx0CCIBqbxxCUJaFZL4FChvE3MeDOy7D0qsglboc",
        // "recipient_name": "",
        "recipient_type": "email",
        "recipient_value": userName,
        "otp_for": "sign_in"
      }
    }

// USING API OF MOBILE 

// let data = {
//   "user": {
//     "email": userName ,
//   }
// }

    console.log("body = ", data);
    // USE FETCH METHOD
    fetch("/api/v2/users/send_otp", {
      // fetch("/api/v2/users/password?locale=en", {
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

    return(
        <>

<div className="submainView">
            <h1 className='h1'>{resources.LOGIN.WE_ARE_HAPPY_HEADING}</h1>
           
            <div className="emailcontainer">
              <div className="emailphonelabel"> {resources.LOGIN.EMAIL_OR_PHONE_LABEL} </div>
              <div className="stylEmailDiv">
              {/* {store.getState().InputIsNumber ? (<select className="stylSelectDiv" value={store.getState().countryCode} onChange={(e) => this.setState({countryCode: e.target.value })}> */}
              {InputIsNumber ? (<select className="stylSelectDiv" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                {countryCodes.map(item => {
                  return (<option>
                    <div key={item.name}>
                      {item.name} {item.dial_code}
                    </div>
                  </option>)
                })}
              </select>) : null}
              <input placeholder = {resources.LOGIN.EMAIL_OR_PHONE} type="text"  id="emailInput" value={email} onChange={handleChangeEmail}/> 
                </div>           
            </div>
            <div className='loginWithPWcontainer'>
              <button className="otpviewBtton" id="loginWithPWbutton" onClick={() => props.LoginWithPassword(true)}> {resources.LOGIN.LOGIN_WITH_PASSWORD} </button>
            </div>
            <div className="submitbuttoncontainer">
              <button id="sendCodeInLoginwithPassword" className = {(email === '')? 'letGoButtonDisable' : 'letGoButtonEnable'} 
               disabled={(email === '')} onClick={sendCodeAction} > {resources.LOGIN.SEND_CODE} </button>
                 <OTPViewModal email = {email} otpShowModal= {otpShowModal} handleOtpHide={handleOtpHide}/>
              
            </div><br/><br/>
            <div className="disclaimerSenCodeContainer">
              <p className="disclaimerSenCode">
               {resources.LOGIN.DISCLAIMER_SEND_CODE}
              </p>
            </div>
          </div>

        </>
    )
}

export default LoginWithAccessPin;