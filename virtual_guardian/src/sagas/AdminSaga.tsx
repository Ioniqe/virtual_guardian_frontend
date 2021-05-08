import { call, put, takeLatest } from "@redux-saga/core/effects";
import { User } from "../model/models";
import { DELETE_ADMINS, GET_ADMINS } from "../types/AdminTypes";
import { getAdminsRequest, getAdminsFailure, getAdminsSuccess, deleteAdminsRequest, deleteAdminsFailure, deleteAdminsSuccess } from "../actions/AdminAction";
import { getAdminsAPI, deleteAdminsAPI } from "../api/AdminApi";

function* getAdminsAsync() {
  try {
    yield put(getAdminsRequest());
    const response: User[] = yield call(() => getAdminsAPI());
    yield put(getAdminsSuccess(response as User[]))
  } catch (e) {
    yield put(getAdminsFailure("An unexpected error has occured!"))
  }
}

export function* getAdminsWatcher() {
  yield takeLatest(GET_ADMINS, getAdminsAsync)
}

interface Props {
  type: string,
  payload: string[]
}

function* deleteAdminsAsync(props: Props) {
  try {
    yield put(deleteAdminsRequest());
    const response: number = yield call(() => deleteAdminsAPI(props.payload));

    if (response === 500) {
      yield put(deleteAdminsFailure("Server returned error!"))
    } else {
      yield put(deleteAdminsSuccess())
    }
  } catch (e) {
    yield put(deleteAdminsFailure("An unexpected error has occured!"))
  }
}

export function* deleteAdminsWatcher() {
  yield takeLatest(DELETE_ADMINS, deleteAdminsAsync)
}
