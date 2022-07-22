
import _default from "react-redux/es/components/connect"
import { combineReducers, createStore } from "redux";
import * as type from '../store/types';
import store from "./store";

// const initialStateHook = {     
//      tokenReceived : "",
// }

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
      isLoginSuccessful : false,
      tokenReceived : "",
}

const INITIAL_STATE_LOGIN = {
    accessToken:"",
    message:"",
}

const INITIAL_STATE_LOGIN_ROLE = {
    response:"",
}

const INITIAL_STATE_TEAM_MEMBERS = {
    responseTM : "",
}

// FUNCTION IS CALLED FROM LET GO BUTTON ACTION TO RETURN ACTION TYPE
export function loginAction() {
    return {
      type: type.POST_LOGIN_REQUESTED,
    }
  }

  export function getUserRoleWhileLogin() {
    return {
      type: type.GET_USER_ROLE,
    }
  }

  export function getTeamMemberListWhileLogin() {
    return {
      type: type.GET_TEAM_MEMBER_REQUEST,
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
case type.IS_LOGIN_SUCCESSFUL:
    return{
        ...state,
        isLoginSuccessful : action.isLoginSuccessful
    }
case type.TOKEN_RECEIVED:
    return{
        ...state,
        tokenReceived : action.tokenReceived
    }
        default:
            return state;
    }
}

// REDUCER FOR LOGIN API
const loginApiReducer = (state = INITIAL_STATE_LOGIN, action) => {
    switch (action.type) {
        case type.POST_LOGIN_REQUESTED:
            return{
                ...state,
        }
        case type.LOGIN_SUCCESS:
            return{
                ...state,
                accessToken: state.accessToken,
                isLoginSuccessful: true
        }
        case type.LOGIN_FAILED:
            return{
                ...state,
                message: state.message,
                accessToken : '',
                isLoginSuccessful: false
        }
        default:
            return state;
    }
}

//REDUCER TO GET THE USER ROLE
const getRoleApiReducer = (state = INITIAL_STATE_LOGIN_ROLE, action) => {

    switch (action.type) {
        case type.GET_USER_ROLE:
            return{
                ...state,
      }
        case type.GET_ROLE_SUCCESS:
             return{
                ...state,
                response : action.response,
        }
        case type.GET_ROLE_FAILED:
            return{
                ...state,
                // roleMessage: action.roleMessage,
        }
        case type.GET_USER_RESPONSE:
            return{
                ...state,
                response : action.response,
            }
        default:
            return state;
    }
}

//TO GET THE LIST OF TEAM MEMBER
const getTeamMemberApiReducer = (state = INITIAL_STATE_TEAM_MEMBERS, action) => {

    switch (action.type) {
        case type.GET_TEAM_MEMBER_REQUEST:
            return{
                ...state,
      }
        case type.GET_TEAM_MEMBER_SUCCESS:
             return{
                ...state,
                responseTM : action.responseTM,
        }
        case type.GET_TEAM_MEMBER_FAILED:
            return{
                ...state,
                // roleMessage: action.roleMessage,
        }
         default:
            return state;
    }
}

// COMBINE ALL REDUCERS
export const rootReducer = combineReducers({
    reducer: reducer,
    loginApiReducer : loginApiReducer,
    getRoleApiReducer : getRoleApiReducer,
    getTeamMemberApiReducer : getTeamMemberApiReducer,
})