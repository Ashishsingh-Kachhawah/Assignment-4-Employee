import { call, put, takeLatest } from "redux-saga/effects";
import store from "../store/store";
import {
    GET_TEAM_MEMBER_REQUEST,
    GET_TEAM_MEMBER_SUCCESS,
    GET_TEAM_MEMBER_FAILED,
} from "../store/types";

async function getTeamMemberAPI(props) {
  // var yourToken = store.getState().reducer.tokenReceived;
  const yourToken = window.localStorage.getItem("bearerToken")
    let url ="/api/v2/company_users?include=user, user/image, role&page=1&per_page=50";
      console.log("URL <><><></><></><>", url);
      console.log( `Bearer ${yourToken}`);
    try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${yourToken}`,
        "Content-Type": "application/json",
      }
    });
    const dataa = await res.json();
    return dataa;
  } catch (e) {
    console.log("eeeee === ", e);
    return null;
  }
  
  }
  
  // CREATE GENERATOR FUNCTION FOR LOGIN API FUNCTION CALL
  function* fetchTeamMemberListAPI(action) {
    try {
      const responseTM = yield call(getTeamMemberAPI);
      console.log("The response === ", responseTM);
      yield put({type: GET_TEAM_MEMBER_SUCCESS, responseTM : responseTM});
    } catch (error) {
      yield put({ type: GET_TEAM_MEMBER_FAILED, error });
    }
  }
  
  // ONE MORE GENERATOR FUNCTION FOR EVERY API FUCNTION
  function* getTeamMemberListSaga() {
    yield takeLatest(GET_TEAM_MEMBER_REQUEST, fetchTeamMemberListAPI);
  }
  
  export default getTeamMemberListSaga;
  