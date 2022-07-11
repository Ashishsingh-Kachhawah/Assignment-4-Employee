
import _default from "react-redux/es/components/connect"
import { combineReducers, createStore } from "redux";
import * as type from '../store/types';


const INITIAL_STATE = {
      environment: "staging",
      email:"",
      password:"",
      showModal: false,
      countryCode:"",
      InputIsNumber:false,
      otpShowModal: false,
      IsLoginWithPassword: true,
      client_id:"",
      client_secret:"",
      hideErrorLabel: true,

}

const INITIAL_STATE_LOGIN = {
    accessToken:"",
    message:""
}

// FUNCTION IS CALLED FROM LET GO BUTTON ACTION TO RETURN ACTION TYPE
export function loginAction() {
    return {
      type: type.POST_LOGIN_REQUESTED,
    }
  }

const environmentrReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case type.ENVIRONMENT_VALUE:
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
        case type.EMAIL_VALUE:
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
        case type.PASSWORD_VALUE:
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
        case type.SHOWMODAL_VALUE:
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
        case type.COUNTRYCODE_VALUE:
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
        case type.INPUTNUMBER_VALUE:
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
        case type.OTPSHOWMODAL_VALUE:
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
        case type.ISLOGINWITHPASSWORD_VALUE:
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
        case type.ENVIRONMENT_VALUE:
            console.log("ENVIRONMENT_VALUE triggered this case = ",action.environment);
            return{
                ...state,
                environment: action.environment
        }   
 case type.EMAIL_VALUE:
            return{
                ...state,
                email: action.email,
        } 
case type.PASSWORD_VALUE:
            return{
                ...state,
                password: action.password
        }
case type.SHOWMODAL_VALUE:
            return{
                ...state,
                showModal: action.showModal
        }
case type.COUNTRYCODE_VALUE:
            return{
                ...state,
                countryCode: action.countryCode
        }
 case type.INPUTNUMBER_VALUE:
            return{
                ...state,
                InputIsNumber: action.InputIsNumber
        }
case type.OTPSHOWMODAL_VALUE:
            return{
                ...state,
                otpShowModal: action.otpShowModal
        }
 case type.ISLOGINWITHPASSWORD_VALUE:
            return{
                ...state,
                IsLoginWithPassword: action.IsLoginWithPassword
        }
 case type.CLIENT_ID:
    return{
        ...state,
        client_id: action.client_id
    }

case type.CLIENT_SECRET:
    return{
        ...state,
        client_secret: action.client_secret
    }
case type.HIDE_ERROR_LABEL:
    return{
        ...state,
        hideErrorLabel : action.hideErrorLabel
    }
        default:
            return state;
    }
}

// export const store = createStore(reducer)
// console.log("initial state = ", store.getState())

// REDUCER FOR LOGIN API
const loginApiReducer = (state = INITIAL_STATE_LOGIN, action) => {
    switch (action.type) {
        case type.POST_LOGIN_REQUESTED:
            return{
                ...state,
        }
        case type.LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS_after action in rootreducer=== ",action.loginuser);
            return{
                ...state,
                accessToken: state.accessToken
        }
        case type.LOGIN_FAILED:
            return{
                ...state,
                message: state.message
        }
        default:
            return state;
    }
}

// COMBINE ALL REDUCERS
export const rootReducer = combineReducers({
    reducer: reducer,
    loginApiReducer : loginApiReducer
})