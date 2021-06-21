import { call, put, takeLatest } from "@redux-saga/core/effects";
import { trainModelFailure, trainModelRequest, trainModelSuccess, getActivitiesFailure, getActivitiesRequest, getActivitiesSuccess, detectAnomaliesFailure, detectAnomaliesRequest, detectAnomaliesSuccess, setDefaultModelFailure, setDefaultModelSuccess, setDefaultModelRequest } from "../actions/ActivityAction";
import { trainModelAPI, getActivitiesAPI, detectAnomaliesAPI, setDefaultModelAPI } from "../api/ActivityApi";
import { ActivityList, DayDetected, TrainModel } from "../model/models";
import { DETECT_ANOMALY, GET_ACTIVITY_LIST, SET_DEFAULT_MODEL, TRAIN_MODEL } from "../types/ActivityTypes";

interface Props {
  type: string,
  payload: ActivityList[] | TrainModel | string
}

function* getActivitiesAsync({ type, payload }: Props) {
  try {
    yield put(getActivitiesRequest());
    const response: ActivityList[] = yield call(() => getActivitiesAPI(payload as string));

    yield put(getActivitiesSuccess(response as ActivityList[]))
  } catch (e) {
    yield put(getActivitiesFailure("An unexpected error has occured!"))
  }
}

export function* getActivitiesWatcher() {
  yield takeLatest(GET_ACTIVITY_LIST, getActivitiesAsync)
}

//TODO considera si cand score da 404 din flask (de ex)

function* detectAnomaliesAsync({ type, payload }: Props) {
  try {
    yield put(detectAnomaliesRequest());
    const response: { predictions: DayDetected[] | string } = yield call(() => detectAnomaliesAPI(payload as ActivityList[]))
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
    const response: { score: number | string } = yield call(() => trainModelAPI(payload as TrainModel))
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

function* setDefaultModelAsync() {
  try {
    yield put(setDefaultModelRequest());
    const response: number = yield call(() => setDefaultModelAPI());
    if (response === 200) {
      yield put(setDefaultModelSuccess())
    }
  } catch (e) {
    yield put(setDefaultModelFailure("An unexpected error has occured!"))
  }
}

export function* setDefaultModelWatcher() {
  yield takeLatest(SET_DEFAULT_MODEL, setDefaultModelAsync)
}