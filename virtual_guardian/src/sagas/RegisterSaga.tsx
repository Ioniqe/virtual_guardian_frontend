import { SpecialUser } from "../model/models";
import { takeLatest, call, put } from "redux-saga/effects";
import { saveUserFailure, saveUserRequest, saveUserSuccess } from "../actions/RegisterAction";
import { SAVE_USER } from "../types/RegisterTypes";
import { saveUserAPI } from "../api/RegisterApi";

interface Props {
  type: string,
  payload: SpecialUser
} 

interface ResponseGenerator{
  config?:any,
  data?:any,
  headers?:any,
  request?:any,
  status?:number,
  statusText?:string
}

function* registerUserAsync(props: Props) {
  try {
    yield put(saveUserRequest());
    const response: ResponseGenerator = yield call(() => saveUserAPI(props.payload));
    if (response.status === 401) {
      yield put(saveUserFailure("Credentials are invalid!"))
    } else {
      yield put(saveUserSuccess())
    }
  } catch (e) {
    yield put(saveUserFailure("An unexpected error has occured!"))
  }
}

export function* registerUserWatcher() {
  yield takeLatest(SAVE_USER, registerUserAsync)
}
