import { call, put, takeLatest } from "@redux-saga/core/effects";
import { loginUserFailure, loginUserRequest, loginUserSuccess } from "../actions/LoginAction";
import { loginUserAPI } from "../api/LoginApi";
import { LoginUser, User } from "../model/models";
import { LOGIN_USER } from "../types/LoginTypes";

interface Props {
  type: string,
  payload: User | LoginUser
}

function* loginUserAsync(props: Props) {
  try {
    yield put(loginUserRequest());
    const response: User | number = yield call(() => loginUserAPI(props.payload as LoginUser));

    if (response === 404) {
      yield put(loginUserFailure("User not found!"))
    } else {
      yield put(loginUserSuccess(response as User))
    }
  } catch (e) {
    yield put(loginUserFailure("An unexpected error has occured!"))
  }
}

export function* loginUserWatcher() {
  yield takeLatest(LOGIN_USER, loginUserAsync)
}