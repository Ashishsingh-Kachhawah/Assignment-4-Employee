
import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import store from "../store/store";

const loginUrl = "/oauth/token"

function LoginApi (props)  {
    console.log("login api saga is called");
  // const userEmail = useSelector(state => state.reducer.email);
  // const password  = useSelector(state => state.reducer.password);
  // const client_id = useSelector(state => state.reducer.client_id);
  // const client_secret = useSelector(state => state.reducer.client_secret);


  const InputIsNumber = store.getState().reducer.InputIsNumber;
  const CountryCode = store.getState().reducer.countryCode;
  const email = store.getState().reducer.email;
  console.log("In Login API -- ",InputIsNumber);

  let userName = email;
  console.log("=======",userName);
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

       console.log("url === ", loginUrl);
       console.log("body = ", data);
   
       fetch(loginUrl, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
       })
         .then((response) => response.json())
         .then((data) => {
           console.log("response data = ", data);
           alert("Login successfully, access_token = "+data.access_token);
           // window.location.href = "https://demospngp.staging.utilizecore.com/company/outbound/work_orders"
         })
         .catch((error) =>{
           alert("Unable to login");
           store.dispatch({type: 'HIDE_ERROR_LABEL' , hideErrorLabel : false});
           console.log("hideErrorLabel ---", store.getState().reducer.hideErrorLabel)
         })
   
   }

   // CREATE GENERATOR FUNCTION FOR LOGIN API FUNCTION CALL
  function* fetchLoginAPI(action){
       try{
          const user = yield call(LoginApi)
          console.log("fetchLoginApi_user = ",user);
          yield put({type: "LOGIN_SUCCESS", loginuser: user.access_token})
       }catch(error){
          yield put({type: "LOGIN_FAILED", message: error.message})
       }
  }

  // ONE MORE GENERATOR FUNCTION FOR EVERY API FUCNTION
  function* loginUserSaga(){
    yield takeLatest("POST_LOGIN_REQUESTED", fetchLoginAPI)
  }

 export default loginUserSaga