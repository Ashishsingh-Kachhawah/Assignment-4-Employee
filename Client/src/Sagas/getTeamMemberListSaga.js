import { call, put, takeLatest } from "redux-saga/effects";
// import company_users from "../DashBoardComponent/Response";
// import store from "../store/store";

// const employeeDetailsController = require("../../../server/src/controllers/employeeDetails.controller.js");
import {
  GET_TEAM_MEMBER_REQUEST,
  GET_TEAM_MEMBER_SUCCESS,
  GET_TEAM_MEMBER_FAILED,
} from "../store/types";


async function getTeamMemberAPI(props) {
  // var yourToken = store.getState().reducer.tokenReceived;
  const yourToken = window.localStorage.getItem("bearerToken")
  let url = "/api/v2/company_users?include=user, user/image, role&page=1&per_page=50";
  console.log("URL <><><></><></><>", url);
  console.log(`Bearer ${yourToken}`);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${yourToken}`,
        "Content-Type": "application/json",
      }
    });
    const dataa = await res.json();
    // employeeDetailsController.copyAttendancetable();
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
    console.log("The response value in saga === ", responseTM);
    yield postUserDetails(responseTM);
    yield put({ type: GET_TEAM_MEMBER_SUCCESS, responseTM: responseTM });
  } catch (error) {
    yield put({ type: GET_TEAM_MEMBER_FAILED, error });
  }
}

// ONE MORE GENERATOR FUNCTION FOR EVERY API FUCNTION
function* getTeamMemberListSaga() {
  yield takeLatest(GET_TEAM_MEMBER_REQUEST, fetchTeamMemberListAPI);
}

function postUserDetails(responseTM) {

  // let requests = urls.map(url => fetch(url));

  // let promise = new Promise(function(resolve, reject) {
  // setTimeout(() => resolve("done!"), 1000);

  console.log("postUserDetails", responseTM);
  console.log("postUserDetails_company_users", responseTM.company_users);

  let requests = responseTM.company_users.map(
    (item) => (
      console.log("fullname", item.user === null ? "-" : item.user.full_name),
      fetch("http://127.0.0.1:3002/employeedetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3002",
        },
        body: JSON.stringify({
          employeeid: item.user === null ? 1 : item.user.id,
          first_name:
            item.user === null ? "Data not Found" : item.user.first_name,
          last_name:
            item.user === null ? "Data not Found" : item.user.last_name,
          full_name:
            item.user === null ? "Data not Found" : item.user.full_name,
          email:
            item.user === null ? "Data not Found" : item.user.email,
          mobile: 9588432537,
          access_right: item.role.name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("response data = ", data);
        })
        .catch((error) => {
          console.log("Error = ", error);
        })
    )
  );


  Promise.all(requests)
    .then(() => {
      fetch("http://127.0.0.1:3002/employeedetails/copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3002",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("response data copy= ", data);
        })
        .catch((error) => {
          console.log("Error copy api fetch = ", error);
        })
      return true;
    });



}

export default getTeamMemberListSaga;
