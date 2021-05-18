import { call, put, takeLatest } from "@redux-saga/core/effects";
import { detectAnomalyFailure, detectAnomalyRequest, detectAnomalySuccess, getActivitiesFailure, getActivitiesRequest, getActivitiesSuccess } from "../actions/ActivityAction";
import { detectAnomalyAPI, getActivitiesAPI } from "../api/ActivityApi";
import { Activity, MlObject } from "../model/models";
import { DETECT_ANOMALY, GET_ACTIVITY_LIST } from "../types/ActivityTypes";

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

interface Props {
  type: string,
  payload: MlObject
}

function* detectAnomalyAsync({ type, payload }: Props) {
  try {
    yield put(detectAnomalyRequest());
    const response: {prediction: string} | number = yield call(() => detectAnomalyAPI(payload))
    console.log('RESPONSE')
    console.log(response)
    //TODO show result
    if (response === 500) {
      yield put(detectAnomalyFailure("An unexpected error has occured!"))
    } else {
      yield put(detectAnomalySuccess((response as {prediction: string}).prediction))
    }
  } catch (e) {
    console.log(e)
    yield put(detectAnomalyFailure("An unexpected error has occured!"))
  }
}

export function* detectAnomalyWatcher() {
  yield takeLatest(DETECT_ANOMALY, detectAnomalyAsync)
}