import { all } from "redux-saga/effects";
import { deleteAdminsWatcher, getAdminsWatcher } from "../sagas/AdminSaga";
import { loginUserWatcher } from "../sagas/LoginSaga";
import { deletePatientsWatcher, getPatientsWatcher, predictDiseaseWatcher, savePatientWatcher } from "../sagas/PatientSaga";
import { registerUserWatcher } from "../sagas/RegisterSaga";

export default function* rootSaga() {
  yield all([
    registerUserWatcher(),
    loginUserWatcher(),
    getAdminsWatcher(),
    deleteAdminsWatcher(),
    predictDiseaseWatcher(),
    getPatientsWatcher(),
    deletePatientsWatcher(),
    savePatientWatcher(),
    
  ])
}
