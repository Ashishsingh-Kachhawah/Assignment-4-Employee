import { all } from "redux-saga/effects"
import loginUserSaga from "./LoginSaga"

// COMBINED ALL SAGA HERE
export default function* rootSaga() {
    yield all([
        loginUserSaga(),
    ])
}