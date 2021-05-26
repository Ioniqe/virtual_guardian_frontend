import { call, put, takeLatest } from "@redux-saga/core/effects";
import { trainModelFailure, trainModelRequest, trainModelSuccess, getActivitiesFailure, getActivitiesRequest, getActivitiesSuccess, detectAnomaliesFailure, detectAnomaliesRequest, detectAnomaliesSuccess } from "../actions/ActivityAction";
import { trainModelAPI, getActivitiesAPI, detectAnomaliesAPI } from "../api/ActivityApi";
import { Activity, ActivityList, DayDetected, TrainModel } from "../model/models";
import { DETECT_ANOMALY, GET_ACTIVITY_LIST, TRAIN_MODEL } from "../types/ActivityTypes";

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
  payload: ActivityList[] | TrainModel
}

function* detectAnomaliesAsync({ type, payload }: Props) {
  try {
    yield put(detectAnomaliesRequest());
    const response: {predictions: DayDetected[] | string} = yield call(() => detectAnomaliesAPI(payload as ActivityList[]))
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

function* trainModelAsync({ type, payload }: Props) {
  try {
    yield put(trainModelRequest());
    const response: {score: number | string} = yield call(() => trainModelAPI(payload as TrainModel))
    if (response.score as string === '500') {
      yield put(trainModelFailure("An unexpected error has occured!"))
    } else {
      yield put(trainModelSuccess(response.score as number))
    }
  } catch (e) {
    console.log(e)
    yield put(trainModelFailure("An unexpected error has occured!"))
  }
}

export function* trainModelWatcher() {
  yield takeLatest(TRAIN_MODEL, trainModelAsync)
}