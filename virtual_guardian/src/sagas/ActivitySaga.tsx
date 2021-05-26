import { call, put, takeLatest } from "@redux-saga/core/effects";
import { detectAnomaliesFailure, detectAnomaliesRequest, detectAnomaliesSuccess, getActivitiesFailure, getActivitiesRequest, getActivitiesSuccess } from "../actions/ActivityAction";
import { detectAnomaliesAPI, getActivitiesAPI } from "../api/ActivityApi";
import { Activity, ActivityList, DayDetected } from "../model/models";
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
  payload: ActivityList[]
}

function* detectAnomaliesAsync({ type, payload }: Props) {
  try {
    yield put(detectAnomaliesRequest());
    const response: {predictions: DayDetected[] | string} = yield call(() => detectAnomaliesAPI(payload))
    console.log('RESPONSE')
    console.log(response)
    //TODO show result
    if (response.predictions as string === 'unexpected error') {
      yield put(detectAnomaliesFailure("An unexpected error has occured!"))
    } else {
      yield put(detectAnomaliesSuccess(response.predictions as DayDetected[]))
    }
  } catch (e) {
    console.log(e)
    yield put(detectAnomaliesFailure("An unexpected error has occured!"))
  }
}

export function* detectAnomaliesWatcher() {
  yield takeLatest(DETECT_ANOMALY, detectAnomaliesAsync)
}