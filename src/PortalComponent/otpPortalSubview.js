import InputFields from "../loginComponent/OtpInputField";
import { resources } from "../Utility/StringResource";
import OtpModal from "./OTPportalView";

const OTPViewModal = (props) => {
  const handleOtpHide = () => {
    // this.setState({ otpShowModal: false });
  }

  const sendCodeAction = () => {
  }
     // PORTAL FOR OTP FILED
        const otpModalView = props.otpShowModal ? (
            <OtpModal>
        
                <div className="modalotp">
        
                  <div className="popup">
                    <button id='btncancel' onClick={()=>props.handleOtpHide(false)}>
                      <img src="../Images/DeleteIcon.png" width="20" />
                    </button>
        
                    <div className='stylEntirePopup'>
                        <div className='stylHeaderPopup'>
                          <h1>{props.email}</h1>
                          <hr />
                        </div>
                        <div className='bodyPopup'>
                          <h1 className='OTPtxt'>{resources.OTP_POTAL.WE_JUST_SENT}</h1>
                          <h1 className='OTPtxt'>{resources.OTP_POTAL_ENTER_YOUR_CODE}</h1>
                          <InputFields/>
                        </div>
                        <h4 className="resendH4">{resources.OTP_POTAL.DIDNT_RECEIVE_CODE} <button id="resendButton" onClick={sendCodeAction}>{resources.OTP_POTAL.RESEND}</button></h4>
                      </div>
                </div> 
                  </div>
              </OtpModal>
            ) : null;
            return(
                <>
                    {otpModalView}
                </>
            )
     
}
export default OTPViewModal;