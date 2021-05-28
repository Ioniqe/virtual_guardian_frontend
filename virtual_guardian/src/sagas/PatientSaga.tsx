import { call, put, takeLatest } from "@redux-saga/core/effects";
import { assignCaregiverFailure, assignCaregiverRequest, assignCaregiverSuccess, deletePatientsFailure, deletePatientsRequest, deletePatientsSuccess, getPatientFailure, getPatientRequest, getPatientsListFailure, getPatientsListRequest, getPatientsListSuccess, getPatientSuccess, predictDiseaseFailure, predictDiseaseRequest, predictDiseaseSuccess, savePatientFailure, savePatientRequest, savePatientSuccess, sendEmergencyFailure, sendEmergencyRequest, sendEmergencySuccess, updatePatientFailure, updatePatientRequest, updatePatientSuccess } from "../actions/PatientAction";
import { assignCaregiverAPI, deletePatientsAPI, getPatientAPI, getPatientsAPI, predictDiseaseAPI, savePatientAPI, sendEmergencyAPI, updatePatientAPI } from "../api/PatientApi";
import { DiseaseProps, User } from "../model/models";
import { ASSIGN_CAREGIVER, DELETE_PATIENTS, GET_PATIENT, GET_PATIENTS_LIST, PREDICT_DISEASE, SAVE_PATIENT, SEND_EMERGENCY, UPDATE_PATIENT } from "../types/PatientTypes";

interface Props {
  type: string,
  payload: string[] | string | { 'patient': User, 'doctorId': string } | User | { 'caregiverId': string, 'patientId': string }
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
    const response: ResponseGenerator = yield call(() => savePatientAPI(props.payload as { 'patient': User, 'doctorId': string }));

    switch (response) {
      case 500:
        yield put(savePatientFailure("Server has returned an error!"))
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

function* updatePatientAsync(props: Props) {
  try {
    yield put(updatePatientRequest());
    const response: ResponseGenerator = yield call(() => updatePatientAPI(props.payload as User));

    switch (response) {
      case 500:
        yield put(updatePatientFailure("Server has returned an error!"))
        break;
      case 404:
        yield put(updatePatientFailure("The patient to be updated was not found!"))
        break;
      case 200:
        yield put(updatePatientSuccess())
        break;
      default:
        console.error('in updatePatientAsync, response status unrecognized');
    }

  } catch (e) {
    yield put(updatePatientFailure("An unexpected error has occured!"))
  }
}

export function* updatePatientWatcher() {
  yield takeLatest(UPDATE_PATIENT, updatePatientAsync)
}

function* sendEmergencyAsync({ type, payload }: Props) {
  try {
    yield put(sendEmergencyRequest());
    const response: number = yield call(() => sendEmergencyAPI(payload as string))
    switch (response) {
      case 200:
        yield put(sendEmergencySuccess())
        break;
      case 404:
        yield put(sendEmergencyFailure('User not found!'))
        break;
      default:
        console.error('in sendEmergencyAsync, response status unrecognized');
    }
  } catch (e) {
    yield put(sendEmergencyFailure("An unexpected error has occured!"))
  }
}

export function* sendEmergencyWatcher() {
  yield takeLatest(SEND_EMERGENCY, sendEmergencyAsync)
}

function* assignCaregiverAsync(props: Props) {
  try {
    yield put(assignCaregiverRequest());
    const response: ResponseGenerator = yield call(() => assignCaregiverAPI(props.payload as { 'caregiverId': string, 'patientId': string }));

    switch (response) {
      case 500:
        yield put(assignCaregiverFailure("Server has returned an error!"))
        break;
      case 404:
        yield put(assignCaregiverFailure("User was not found!"))
        break;
      case 200:
        yield put(assignCaregiverSuccess())
        break;
      default:
        console.error('in assignCaregiverAsync, response status unrecognized');
    }

  } catch (e) {
    yield put(assignCaregiverFailure("An unexpected error has occured!"))
  }
}

export function* assignCaregiverWatcher() {
  yield takeLatest(ASSIGN_CAREGIVER, assignCaregiverAsync)
}

function* getPatientAsync({ type, payload }: Props) {
  try {
    yield put(getPatientRequest());
    const response: User | number = yield call(() => getPatientAPI(payload as string))
    if (typeof response === 'number') {
      switch (response) {
        case 500:
          yield put(getPatientFailure("An unexpected error has occured!"))
          break;
        case 404:
          yield put(getPatientFailure("User not found!"))
          break;
        default:
          console.error('in getPatientAsync, response status unrecognized');
      }
    }

    yield put(getPatientSuccess(response as User))

  } catch (e) {
    yield put(getPatientFailure("An unexpected error has occured!"))
  }
}

export function* getPatientWatcher() {
  yield takeLatest(GET_PATIENT, getPatientAsync)
}