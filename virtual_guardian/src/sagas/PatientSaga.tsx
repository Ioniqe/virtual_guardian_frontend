import { call, put, takeLatest } from "@redux-saga/core/effects";
import { predictDiseaseFailure, predictDiseaseRequest, predictDiseaseSuccess } from "../actions/PatientAction";
import { predictDiseaseAPI } from "../api/PatientApi";
import { DiseaseProps } from "../model/models";
import { PREDICT_DISEASE } from "../types/PatientTypes";

interface Props {
  type: string,
  payload: string[]
}

function* predictDiseaseAsync({ type, payload }: Props) {
  try {
    yield put(predictDiseaseRequest());
    const response: DiseaseProps | number = yield call(() => predictDiseaseAPI(payload as string[]));
    if (response === 500) {
      yield put(predictDiseaseFailure("An unexpected error has occured!"))
    } else {
      yield put(predictDiseaseSuccess((response as DiseaseProps).disease))
    }
  } catch (e) {
    yield put(predictDiseaseFailure("An unexpected error has occured!"))
  }
}

export function* predictDiseaseWatcher() {
  yield takeLatest(PREDICT_DISEASE, predictDiseaseAsync)
}
