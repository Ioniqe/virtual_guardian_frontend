import { all } from "redux-saga/effects";
import { adminsWatcher } from "../sagas/AdminSaga";
import { loginUserWatcher } from "../sagas/LoginSaga";
import { registerUserWatcher } from "../sagas/RegisterSaga";

export default function* rootSaga() {
  yield all([
    registerUserWatcher(),
    loginUserWatcher(),
    adminsWatcher(),

  ])
}
