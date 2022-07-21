// import { configureStore, createStore } from "@reduxjs/toolkit"
import _default from "react-redux/es/components/connect"
import { combineReducers, createStore } from "redux";

const ENVIRONMENT_VALUE = "ENVIRONMENT_VALUE"
const EMAIL_VALUE = "EMAIL_VALUE"
const PASSWORD_VALUE = "PASSWORD_VALUE"
const SHOWMODAL_VALUE = "SHOWMODAL_VALUE"
const COUNTRYCODE_VALUE = "COUNTRYCODE_VALUE"
const INPUTNUMBER_VALUE =  "INPUTNUMBER_VALUE"
const OTPSHOWMODAL_VALUE = "OTPSHOWMODAL_VALUE"
const ISLOGINWITHPASSWORD_VALUE = "ISLOGINWITHPASSWORD_VALUE"




function environmentValue () {
    return{
        type: ENVIRONMENT_VALUE
    }
}

function emailValue () {
    return{
        type: EMAIL_VALUE
    }
}

function passwordValue () {
    return{
        type: PASSWORD_VALUE
    }
}

function showModalValue () {
    return{
        type: SHOWMODAL_VALUE
    }
}

function countryCodeValue () {
    return{
        type: COUNTRYCODE_VALUE
    }
}

function inputNumberValue () {
    return{
        type: INPUTNUMBER_VALUE
    }
}

function otpshowModalValue () {
    return{
        type: OTPSHOWMODAL_VALUE
    }
}

function isloginWithPassowrdValue () {
    return{
        type: ISLOGINWITHPASSWORD_VALUE
    }
}
const INITIAL_STATE = {
      environment: "staging",
      email:"",
      password:"",
      showModal: false,
      countryCode:"",
      InputIsNumber:false,
      otpShowModal: false,
      IsLoginWithPassword: true,
}

const environmentrReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ENVIRONMENT_VALUE:
            return{
                ...state,
                environment: state.environment
        }    
        default:
            return state;
    }
}

const emailReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_VALUE:
            return{
                ...state,
                email: state.email,
        }
        default:
            return state;
    }
}

const passwordReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PASSWORD_VALUE:
            return{
                ...state,
                password: state.password
        }
        default:
            return state;
    }
}

const showmodalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOWMODAL_VALUE:
            return{
                ...state,
                showModal: state.showModal
        }
        default:
            return state;
    }
}

const countryCodeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COUNTRYCODE_VALUE:
            return{
                ...state,
                countryCode: state.countryCode
        }
        default:
            return state;
    }
}

const inputNumberReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INPUTNUMBER_VALUE:
            return{
                ...state,
                InputIsNumber: state.InputIsNumber
        }
        default:
            return state;
    }
}

const otpShowModalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OTPSHOWMODAL_VALUE:
            return{
                ...state,
                otpShowModal: state.otpShowModal
        }
        default:
            return state;
    }
}

const isLoginWithPasswordReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ISLOGINWITHPASSWORD_VALUE:
            return{
                ...state,
                IsLoginWithPassword: state.IsLoginWithPassword
        }
        break;
        default:
            return state;
    }
}

// const rootReducer = combineReducers({
//       environment: environmentrReducer,
//       email: emailReducer,
//       password: passwordReducer,
//       showModal: showmodalReducer,
//       countryCode: countryCodeReducer,
//       InputIsNumber: inputNumberReducer,
//       otpShowModal: otpShowModalReducer,
//       IsLoginWithPassword: isLoginWithPasswordReducer,
// })

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ENVIRONMENT_VALUE:
            return{
                ...state,
                environment: state.environment
        }   
 case EMAIL_VALUE:
            return{
                ...state,
                email: state.email,
        } 
case PASSWORD_VALUE:
            return{
                ...state,
                password: state.password
        }
case SHOWMODAL_VALUE:
            return{
                ...state,
                showModal: state.showModal
        }
case COUNTRYCODE_VALUE:
            return{
                ...state,
                countryCode: state.countryCode
        }
 case INPUTNUMBER_VALUE:
            return{
                ...state,
                InputIsNumber: state.InputIsNumber
        }
case OTPSHOWMODAL_VALUE:
            return{
                ...state,
                otpShowModal: state.otpShowModal
        }
 case ISLOGINWITHPASSWORD_VALUE:
            return{
                ...state,
                IsLoginWithPassword: state.IsLoginWithPassword
        }
        default:
            return state;
    }
}

export const store = createStore(reducer)
console.log("initial state = ", store.getState())
