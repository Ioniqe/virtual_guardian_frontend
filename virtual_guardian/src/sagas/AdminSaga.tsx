import { call, put, takeLatest } from "@redux-saga/core/effects";
import { User } from "../model/models";
import { GET_ADMINS } from "../types/AdminTypes";
import { getAdminsRequest, getAdminsFailure, getAdminsSuccess } from "../actions/AdminAction";
import { getAdminsAPI } from "../api/AdminApi";


function* getAdminsAsync() {
  try {
    yield put(getAdminsRequest());
    const response: User[] = yield call(() => getAdminsAPI());

    yield put(getAdminsSuccess(response as User[]))

  } catch (e) {
    yield put(getAdminsFailure("An unexpected error has occured!"))
  }
}

export function* adminsWatcher() {
  yield takeLatest(GET_ADMINS, getAdminsAsync)
}