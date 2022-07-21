import { call, put, takeLatest } from "redux-saga/effects";
import store from "../store/store";
import {
    GET_TEAM_MEMBER_REQUEST,
    GET_TEAM_MEMBER_SUCCESS,
    GET_TEAM_MEMBER_FAILED,
} from "../store/types";

async function getTeamMemberAPI(props) {
  var yourToken = store.getState().reducer.tokenReceived;
    let url ="/api/v2/vendors";
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
    console.log("res --- ", res);
    const dataa = await res.json();
    console.log("dataa ==== ", dataa);
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
  