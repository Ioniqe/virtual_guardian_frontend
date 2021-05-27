import { call, put, takeLatest } from "@redux-saga/core/effects";
import { getLabeledDaysListRequest, getLabeledDaysListFailure, getLabeledDaysListSuccess, saveAnomalousDaysFailure, saveAnomalousDaysRequest, saveAnomalousDaysSuccess } from "../actions/LabeledDayAction";
import { getLabeledDaysListAPI, saveSelectedDaysAsAnomalousAPI } from "../api/LabeledDayApi";
import { LabeledDay } from "../model/models";
import { GET_LABELED_DAYS_LIST, SAVE_LABELED_DAYS_LIST } from "../types/LabeledDayTypes";

interface Props {
  type: string,
  payload: string | Date[]
}

function* getLabeledDaysListAsync(props: Props) {
  try {
    yield put(getLabeledDaysListRequest());
    const response: number | LabeledDay[] = yield call(() => getLabeledDaysListAPI(props.payload as string))

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

function* saveAnomalousDaysAsync(props: Props) {
  try {
    yield put(saveAnomalousDaysRequest());
    const response: number  = yield call(() => saveSelectedDaysAsAnomalousAPI(props.payload as Date[]));
    switch (response) {
      case 500:
        yield put(saveAnomalousDaysFailure("Server has returned an error!"))
        break;
      case 200:
        yield put(saveAnomalousDaysSuccess())
        break;
      default:
        console.error('In saveAnomalousDaysAsync, response status unrecognized');
    }

  } catch (e) {
    yield put(saveAnomalousDaysFailure("An unexpected error has occured!"))
  }
}

export function* saveAnomalousDaysWatcher() {
  yield takeLatest(SAVE_LABELED_DAYS_LIST, saveAnomalousDaysAsync)
}