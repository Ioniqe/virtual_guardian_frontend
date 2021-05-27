import { call, put, takeLatest } from "@redux-saga/core/effects";
import { getLabeledDaysListRequest, getLabeledDaysListFailure, getLabeledDaysListSuccess } from "../actions/LabeledDayAction";
import { getLabeledDaysListAPI } from "../api/LabeledDayApi";
import { LabeledDay } from "../model/models";
import { GET_LABELED_DAYS_LIST } from "../types/LabeledDayTypes";

interface Props {
  type: string,
  payload: string
}

function* getLabeledDaysListAsync(props: Props) {
  try {
    yield put(getLabeledDaysListRequest());
    const response: number | LabeledDay[] = yield call(() => getLabeledDaysListAPI(props.payload))

    if (response as number === 500) {
      yield put(getLabeledDaysListFailure("Server returned error!"))
    } else {
      yield put(getLabeledDaysListSuccess(response as LabeledDay[]))
    }
  } catch (e) {
    yield put(getLabeledDaysListFailure("An unexpected error has occured!"))
  }
}

export function* getLabeledDaysListWatcher() {
  yield takeLatest(GET_LABELED_DAYS_LIST, getLabeledDaysListAsync)
}