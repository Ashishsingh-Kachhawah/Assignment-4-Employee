import { call, put, takeLatest } from "redux-saga/effects";
import store from "../store/store";
import {
  GET_ROLE_SUCCESS,
  GET_ROLE_FAILED,
  GET_USER_ROLE,
} from "../store/types";

function getRoleAPI(props) {
  // let url ="/api/v2/company_users?include=users";
  let url =
    "/api/v2/users/companies?include=logo,contacts,headquarter_address,role,role/accessible_features,mobile_setting&page=1&per_page=200";
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("bearerToken")}`,
      "Content-Type": "application/json",
    }
  })
    .then((res) => {
      console.log("Res================ ", res);
      return res.json();
    })
    .then((dataa) => { 
      console.log("Herrrreee dataaaa === ", dataa);
      return dataa; })
      .catch((e) => {
        console.log("eeeee === ",e)
        return null;
      })
    // });
}

// CREATE GENERATOR FUNCTION FOR LOGIN API FUNCTION CALL
function* fetchUserRoleAPI(action) {
  try {
    const response = yield call(getRoleAPI);
    console.log("RRRESSSPOOONSSSEEE ==== ", response);
    yield put({type: GET_ROLE_SUCCESS, response : response});
  } catch (error) {
    yield put({ type: GET_ROLE_FAILED, error });
  }
}

// ONE MORE GENERATOR FUNCTION FOR EVERY API FUCNTION
function* getRoleDuringLoginSaga() {
  
  yield takeLatest(GET_USER_ROLE, fetchUserRoleAPI);
}

export default getRoleDuringLoginSaga;
