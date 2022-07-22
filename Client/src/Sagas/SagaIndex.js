import { all } from "redux-saga/effects"
import loginUserSaga from "./LoginSaga"
import getRoleDuringLoginSaga from "./getRoleDuringLoginSaga"
import getTeamMemberListSaga from "./getTeamMemberListSaga"

// COMBINED ALL SAGA HERE
export default function* rootSaga() {
    yield all([
        loginUserSaga(),
        getRoleDuringLoginSaga(),
        getTeamMemberListSaga(),
    ])
}