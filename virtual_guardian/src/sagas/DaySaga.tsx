import { call, put, takeLatest } from "redux-saga/effects";
import { getAnomalousDaysListFailure, getAnomalousDaysListRequest, getAnomalousDaysListSuccess, getDaysListFailure, getDaysListRequest, getDaysListSuccess } from "../actions/DayAction";
import { getAnomalousDaysAPI, getDaysAPI } from "../api/DayApi";
import { Day } from "../model/models";
import { GET_ANOMALOUS_DAYS_LIST, GET_DAYS_LIST } from "../types/DayTypes";

function* getDaysAsync() {
  try {
    yield put(getDaysListRequest());
    const response: Day[] = yield call(() => getDaysAPI())
    yield put(getDaysListSuccess(response))
  } catch (e) {
    yield put(getDaysListFailure("An unexpected error has occured!"))
  }
}

export function* getDaysWatcher() {
  yield takeLatest(GET_DAYS_LIST, getDaysAsync)
}

function* getAnomalousDaysAsync() {
  try {
    yield put(getAnomalousDaysListRequest());
    const response: Day[] = yield call(() => getAnomalousDaysAPI())
    yield put(getAnomalousDaysListSuccess(response))
  } catch (e) {
    yield put(getAnomalousDaysListFailure("An unexpected error has occured!"))
  }
}

export function* getAnomalousDaysWatcher() {
  yield takeLatest(GET_ANOMALOUS_DAYS_LIST, getAnomalousDaysAsync)
}
