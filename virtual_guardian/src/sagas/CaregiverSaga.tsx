import { call, put, takeLatest } from "@redux-saga/core/effects";
import { deleteCaregiversFailure, deleteCaregiversRequest, deleteCaregiversSuccess, getCaregiversListFailure, getCaregiversListRequest, getCaregiversListSuccess, saveCaregiverFailure, saveCaregiverRequest, saveCaregiversuccess, updateCaregiverFailure, updateCaregiverRequest, updateCaregiversuccess } from "../actions/CaregiverAction";
import { deleteCaregiversAPI, getCaregiversAPI, saveCaregiverAPI, updateCaregiverAPI } from "../api/CaregiverApi";
import { User } from "../model/models";
import { DELETE_CAREGIVERS, GET_CAREGIVERS_LIST, SAVE_CAREGIVER, UPDATE_CAREGIVER } from "../types/CaregiverTypes";

interface Props {
  type: string,
  payload: string[] | string | User
}

function* getCaregiversAsync() {
  try {
    yield put(getCaregiversListRequest());
    const response: User[] = yield call(() => getCaregiversAPI())
    yield put(getCaregiversListSuccess(response as User[]))
  } catch (e) {
    yield put(getCaregiversListFailure("An unexpected error has occured!"))
  }
}

export function* getCaregiversWatcher() {
  yield takeLatest(GET_CAREGIVERS_LIST, getCaregiversAsync)
}

function* deleteCaregiversAsync(props: Props) {
  try {
    yield put(deleteCaregiversRequest());
    const response: number = yield call(() => deleteCaregiversAPI(props.payload as string[]))

    if (response === 500) {
      yield put(deleteCaregiversFailure("Server returned error!"))
    } else {
      yield put(deleteCaregiversSuccess())
    }
  } catch (e) {
    yield put(deleteCaregiversFailure("An unexpected error has occured!"))
  }
}

export function* deleteCaregiversWatcher() {
  yield takeLatest(DELETE_CAREGIVERS, deleteCaregiversAsync)
}

interface ResponseGenerator {
  config?: any,
  data?: any,
  headers?: any,
  request?: any,
  status?: number,
  statusText?: string
}

function* saveCaregiverAsync(props: Props) {
  try {
    yield put(saveCaregiverRequest());
    const response: ResponseGenerator  = yield call(() => saveCaregiverAPI(props.payload as User));
    switch (response) {
      case 500:
        yield put(saveCaregiverFailure("Server has returned an error!"))
        break;
      case 201:
        yield put(saveCaregiversuccess())
        break;
      default:
        console.error('In saveCaregiverAsync, response status unrecognized');
    }

  } catch (e) {
    yield put(saveCaregiverFailure("An unexpected error has occured!"))
  }
}

export function* saveCaregiverWatcher() {
  yield takeLatest(SAVE_CAREGIVER, saveCaregiverAsync)
}

function* updateCaregiverAsync(props: Props) {
  try {
    yield put(updateCaregiverRequest());

    const response: ResponseGenerator  = yield call(() => updateCaregiverAPI(props.payload as User));

    switch (response) {
      case 500:
        yield put(updateCaregiverFailure("Server has returned an error!"))
        break;
      case 404:
        yield put(updateCaregiverFailure("The caregiver to be updated was not found!"))
        break;
      case 200:
        yield put(updateCaregiversuccess())
        break;
      default:
        console.error('In updateCaregiverAsync, response status unrecognized');
    }

  } catch (e) {
    yield put(updateCaregiverFailure("An unexpected error has occured!"))
  }
}

export function* updateCaregiverWatcher() {
  yield takeLatest(UPDATE_CAREGIVER, updateCaregiverAsync)
}