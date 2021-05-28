import { all } from "redux-saga/effects";
import { detectAnomaliesWatcher, getActivitiesWatcher, setDefaultModelWatcher, trainModelWatcher } from "../sagas/ActivitySaga";
import { deleteAdminsWatcher, getAdminsWatcher } from "../sagas/AdminSaga";
import { deleteCaregiversWatcher, getCaregiversWatcher, saveCaregiverWatcher, updateCaregiverWatcher } from "../sagas/CaregiverSaga";
import { getLabeledDaysListWatcher, saveAnomalousDaysWatcher } from "../sagas/LabeledDaySaga";
import { loginUserWatcher } from "../sagas/LoginSaga";
import { deletePatientsWatcher, getPatientsWatcher, predictDiseaseWatcher, savePatientWatcher, sendEmergencyWatcher, updatePatientWatcher } from "../sagas/PatientSaga";
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
    getCaregiversWatcher(),
    saveCaregiverWatcher(),
    deleteCaregiversWatcher(),
    updatePatientWatcher(),
    updateCaregiverWatcher(),
    getActivitiesWatcher(),
    detectAnomaliesWatcher(),
    trainModelWatcher(),
    setDefaultModelWatcher(),
    getLabeledDaysListWatcher(),
    saveAnomalousDaysWatcher(),
    sendEmergencyWatcher(),

  ])
}
