import { SpecialUser } from "../model/models";
import { takeLatest, call, put } from "redux-saga/effects";
import { saveUserFailure, saveUserRequest, saveUserSuccess } from "../actions/RegisterAction";
import { SAVE_USER } from "../types/RegisterTypes";
import { saveUserAPI } from "../api/RegisterApi";

interface Props {
  type: string,
  payload: SpecialUser
} 

function* registerUserAsync(props: Props) {
  try {
    yield put(saveUserRequest());
    yield call(() => saveUserAPI(props.payload));
    yield put(saveUserSuccess())
  } catch (e) {
    console.log("err");
    yield put(saveUserFailure())
  }
}

export function* registerUserWatcher() {
  yield takeLatest(SAVE_USER, registerUserAsync)
}
