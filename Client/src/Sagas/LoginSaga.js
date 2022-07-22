
import { call, put, takeLatest } from "redux-saga/effects"
import store from "../store/store";

const loginUrl = "/oauth/token"

function LoginApi (props)  {
  const InputIsNumber = store.getState().reducer.InputIsNumber;
  const CountryCode = store.getState().reducer.countryCode;
  const email = store.getState().reducer.email;

  let userName = email;
  if(InputIsNumber){
    let splitArr = CountryCode.split(" ");
    if(splitArr && splitArr.length > 1){
      userName = splitArr[1] +email;
    }
  }

      // CREATE BODY
      let data = {
        "grant_type": "password",
        "scope": "admin",
        "client_id": store.getState().reducer.client_id,
        "client_secret": store.getState().reducer.client_secret,
        "username": userName,
        "password": store.getState().reducer.password
      };
   
       return fetch(loginUrl, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       })
         .then(response => {
          console.log("resp -- ", response);
          return response.json();
        })
         .then((data) => {
           alert("Login successfully, access_token = "+data.access_token);
           store.dispatch({type: "TOKEN_RECEIVED" , tokenReceived : data.access_token});
           // TO KEEP THE USER LOGIN TILL HE LOGS  OUT
           window.localStorage.setItem("isLoggedIn", true);
           window.localStorage.setItem("bearerToken", data.access_token);

           //In Logout func ---
           //window.localStorage.removeItem("isLoggedIn");
           //window.location.href = "/";
           return data;
         })
         .catch((error) =>{
           alert("Unable to login");
           store.dispatch({type: 'HIDE_ERROR_LABEL' , hideErrorLabel : false});
         })
   
   }

   // CREATE GENERATOR FUNCTION FOR LOGIN API FUNCTION CALL
  function* fetchLoginAPI(action){
       try{
          const response = yield call(LoginApi)
          yield [
             put({type: "LOGIN_SUCCESS", response})
          ];
        }catch(error){
          yield put({type: "LOGIN_FAILED", error})
       }
  }

  // ONE MORE GENERATOR FUNCTION FOR EVERY API FUCNTION
  function* loginUserSaga(){
   yield takeLatest("POST_LOGIN_REQUESTED", fetchLoginAPI)
  }

 export default loginUserSaga