
import '../cssComponents/App.css';
import React, { Component } from 'react';
import countryCodes from '../loginComponent/CountryCodes.json'; 
import ForgotPasswordModalView from '../PortalComponent/ForgotPassowrdPortalView';
import OtpModal from '../PortalComponent/OTPportalView';
import InputFields from './OtpInputField';
import FooterView from '../FooterComponent/FooterViewComponent';
import Navigator from '../navigation/navigation';
import PropTypes from 'prop-types';
import ReadyToWork from '../ImageComponent/ReadyToWorkImage';
import LoginWithPassword from './LoginWithPasswordComponent';
import OTPViewModal from '../PortalComponent/otpPortalSubview';
import LoginWithAccessPin from './LoginWithAccessPinComponent';
import {Routes , Route, BrowserRouter} from 'react-router-dom';
import Dashboard from '../DashBoardComponent/Dashboard';
import DashboardNavBar from '../navigation/DashboardNavBar';
import store from '../store/store';

const loggedIn = window.localStorage.getItem("isLoggedIn")
 console.log("loggedIn ==========", loggedIn)    
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      environment: "staging",
      email:"",
      password:"",
      showModal: false,
      countryCode:"",
      InputIsNumber:false,
      otpShowModal: false,
      IsLoginWithPassword: true,  
      isUserLoggedIn : false,
    }
    // var isTokenReceived = store.getState().reducer.tokenReceived;
    //   console.log("APPP TOKEN === ", isTokenReceived);

    // if(this.isTokenReceived){
    //   this.state.isUserLoggedIn(true);
    // }

  }

  
  
  handleChangeEmail = (event) => {
    //TO CHECK INPUT TYPE EITHER EMAIL OR PHONE NUMBER
    isNaN(event.target.value) ? this.setState({ InputIsNumber: false }) : this.setState({ InputIsNumber: true })
    this.setState({ email: event.target.value });
  }

  
  handleChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  handleShow = () => {
    this.setState({ showModal: true });
  }

  handleHide = () => {
    this.setState({ showModal: false });
  }

  LoginWithAccessPinBtnAction = () => {
    this.setState({ IsLoginWithPassword: false });
  }

  LoginWithPassword = () => {
    this.setState({ IsLoginWithPassword: true });
  }

  sendcodeBtnInLogWithPin = () => {
    this.setState({ otpShowModal: true });
  }
  handleOtpHide = () => {
    this.setState({ otpShowModal: false });
  }


  render() {
    const { email, password } = this.state;
   
    return (
      <BrowserRouter>

      <div className="App">

      {loggedIn ? <DashboardNavBar /> : <Navigator environment={this.state.environment} handleChange={this.handleChange}/> }
      
      {/* <Navigator environment={this.state.environment} handleChange={this.handleChange}/> */}
        <div className="mainView">
        
         {/* localStorage.getItem('IsLoginWithPassword') */}
        

         <Routes>
         {/* <Route  path="/" element= {this.state.IsLoginWithPassword && <LoginWithPassword handleLoginWithPassword = {this.LoginWithAccessPinBtnAction} environment = {this.state.environment}/> }/> */}
           
  {/* ADD THIS TO LAND TO DASHBOARD IF USER IS ALREADY LOGGED IN          */}
           <Route  path="/" element= {loggedIn ? <Dashboard /> : (this.state.IsLoginWithPassword && <LoginWithPassword handleLoginWithPassword = {this.LoginWithAccessPinBtnAction} environment = {this.state.environment}/>) } />
           <Route  path="/Dashboard" element={<Dashboard  />} />
         </Routes>

          {!this.state.IsLoginWithPassword && 
         <LoginWithAccessPin LoginWithPassword = {this.LoginWithPassword}/>
          }
          <ReadyToWork />

        </div>
        <FooterView />
      </div>
    </BrowserRouter>
    )
  }

}

export default App;