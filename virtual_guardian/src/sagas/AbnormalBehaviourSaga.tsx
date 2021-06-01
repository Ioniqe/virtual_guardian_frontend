import { call, put, takeLatest } from "@redux-saga/core/effects";
import { getEmergenciesOfPatientsOfCaregiverRequest, getEmergenciesOfPatientsOfCaregiverSuccess, getEmergenciesOfPatientsOfCaregiverFailure, getEmergenciesOfPatientsOfDoctorFailure, getEmergenciesOfPatientsOfDoctorRequest, getEmergenciesOfPatientsOfDoctorSuccess } from "../actions/AbnormalBehaviourAction";
import { getEmergenciesOfPatientsOfCaregiverAPI, getEmergenciesOfPatientsOfDoctorAPI } from "../api/AbnormalBehaviourApi";
import { Emergency } from "../model/models";
import { GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR } from "../types/AbnormalBehaviourTypes";

interface Props {
  type: string,
  payload: string
}

function* getEmergenciesOfPatientsOfDoctorAsync({ type, payload }: Props) {
  try {
    yield put(getEmergenciesOfPatientsOfDoctorRequest());
    const response: Emergency[] | number= yield call(() => getEmergenciesOfPatientsOfDoctorAPI(payload));
    if (typeof response === 'number') {
      switch (response) {
        case 500:
          yield put(getEmergenciesOfPatientsOfDoctorFailure("An unexpected error has occured!"))
          break;
        case 404:
          yield put(getEmergenciesOfPatientsOfDoctorFailure("Doctor not found!"))
          break;
        default:
          console.error('in getEmergenciesOfPatientsOfDoctorAsync, response status unrecognized');
      }
    }

    yield put(getEmergenciesOfPatientsOfDoctorSuccess(response as Emergency[]))
  
  } catch (e) {
    yield put(getEmergenciesOfPatientsOfDoctorFailure("An unexpected error has occured!"))
  }
}

export function* getEmergenciesOfPatientsOfDoctorWatcher() {
  yield takeLatest(GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR, getEmergenciesOfPatientsOfDoctorAsync)
}

function* getEmergenciesOfPatientsOfCaregiverAsync({ type, payload }: Props) {
  try {
    yield put(getEmergenciesOfPatientsOfCaregiverRequest());
    const response: Emergency[] | number= yield call(() => getEmergenciesOfPatientsOfCaregiverAPI(payload));
    if (typeof response === 'number') {
      switch (response) {
        case 500:
          yield put(getEmergenciesOfPatientsOfCaregiverFailure("An unexpected error has occured!"))
          break;
        case 404:
          yield put(getEmergenciesOfPatientsOfCaregiverFailure("Caregiver not found!"))
          break;
        default:
          console.error('in getEmergenciesOfPatientsOfCaregiverAsync, response status unrecognized');
      }
    }

    yield put(getEmergenciesOfPatientsOfCaregiverSuccess(response as Emergency[]))
  
  } catch (e) {
    yield put(getEmergenciesOfPatientsOfCaregiverFailure("An unexpected error has occured!"))
  }
}

export function* getEmergenciesOfPatientsOfCaregiverWatcher() {
  yield takeLatest(GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER, getEmergenciesOfPatientsOfCaregiverAsync)
}
