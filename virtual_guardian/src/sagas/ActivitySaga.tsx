import { call, put, takeLatest } from "@redux-saga/core/effects";
import { getActivitiesFailure, getActivitiesRequest, getActivitiesSuccess } from "../actions/ActivityAction";
import { getActivitiesAPI } from "../api/ActivityApi";
import { Activity } from "../model/models";
import { GET_ACTIVITY_LIST } from "../types/ActivityTypes";

function* getActivitiesAsync() {
  try {
    yield put(getActivitiesRequest());
    const response: Activity[] = yield call(() => getActivitiesAPI());
    yield put(getActivitiesSuccess(response as Activity[]))
  } catch (e) {
    yield put(getActivitiesFailure("An unexpected error has occured!"))
  }
}

export function* getActivitiesWatcher() {
  yield takeLatest(GET_ACTIVITY_LIST, getActivitiesAsync)
}