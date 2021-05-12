import { call, put, takeLatest } from "@redux-saga/core/effects";
import { deletePatientsFailure, deletePatientsRequest, deletePatientsSuccess, getPatientsListFailure, getPatientsListRequest, getPatientsListSuccess, predictDiseaseFailure, predictDiseaseRequest, predictDiseaseSuccess, savePatientFailure, savePatientRequest, savePatientSuccess } from "../actions/PatientAction";
import { deletePatientsAPI, getPatientsAPI, predictDiseaseAPI, savePatientAPI } from "../api/PatientApi";
import { DiseaseProps, User } from "../model/models";
import { DELETE_PATIENTS, GET_PATIENTS_LIST, PREDICT_DISEASE, SAVE_PATIENT } from "../types/PatientTypes";

interface Props {
  type: string,
  payload: string[] | string | { 'patient': User, 'doctorId': string }
}

function* predictDiseaseAsync({ type, payload }: Props) {
  try {
    yield put(predictDiseaseRequest());
    const response: DiseaseProps | number = yield call(() => predictDiseaseAPI(payload as string[]))
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

function* getPatientsAsync({ type, payload }: Props) {
  try {
    yield put(getPatientsListRequest());
    const response: User[] = yield call(() => getPatientsAPI(payload as string))
    yield put(getPatientsListSuccess(response as User[]))
  } catch (e) {
    yield put(getPatientsListFailure("An unexpected error has occured!"))
  }
}

export function* getPatientsWatcher() {
  yield takeLatest(GET_PATIENTS_LIST, getPatientsAsync)
}

function* deletePatientsAsync(props: Props) {
  try {
    yield put(deletePatientsRequest());
    const response: number = yield call(() => deletePatientsAPI(props.payload as string[]))

    if (response === 500) {
      yield put(deletePatientsFailure("Server returned error!"))
    } else {
      yield put(deletePatientsSuccess())
    }
  } catch (e) {
    yield put(deletePatientsFailure("An unexpected error has occured!"))
  }
}

export function* deletePatientsWatcher() {
  yield takeLatest(DELETE_PATIENTS, deletePatientsAsync)
}

interface ResponseGenerator {
  config?: any,
  data?: any,
  headers?: any,
  request?: any,
  status?: number,
  statusText?: string
}

function* savePatientAsync(props: Props) {
  try {
    yield put(savePatientRequest());
    const response: ResponseGenerator  = yield call(() => savePatientAPI(props.payload as { 'patient': User, 'doctorId': string }));

    switch (response) {
      case 500:
        yield put(savePatientFailure("Server has returned an error, please choose a unique username!"))
        break;
      case 201:
        yield put(savePatientSuccess())
        break;
      default:
        console.error('in savePatientAsync, response status unrecognized');
    }

  } catch (e) {
    yield put(savePatientFailure("An unexpected error has occured!"))
  }
}

export function* savePatientWatcher() {
  yield takeLatest(SAVE_PATIENT, savePatientAsync)
}