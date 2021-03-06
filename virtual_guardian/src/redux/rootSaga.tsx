import { all } from "redux-saga/effects";
import { getEmergenciesOfPatientsOfCaregiverWatcher, getEmergenciesOfPatientsOfDoctorWatcher,  } from "../sagas/AbnormalBehaviourSaga";
import { detectAnomaliesWatcher, getActivitiesWatcher, setDefaultModelWatcher, trainModelWatcher } from "../sagas/ActivitySaga";
import { deleteAdminsWatcher, getAdminsWatcher } from "../sagas/AdminSaga";
import { deleteCaregiversWatcher, getCaregiversWatcher, saveCaregiverWatcher, updateCaregiverWatcher } from "../sagas/CaregiverSaga";
import { getAnomalousDaysWatcher, getDaysWatcher } from "../sagas/DaySaga";
import { getLabeledDaysListWatcher, saveAnomalousDaysWatcher } from "../sagas/LabeledDaySaga";
import { loginUserWatcher } from "../sagas/LoginSaga";
import { assignCaregiverWatcher, deletePatientsWatcher, getPatientsWatcher, getPatientWatcher, predictDiseaseWatcher, savePatientWatcher, sendEmergencyWatcher, updatePatientWatcher } from "../sagas/PatientSaga";
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
    assignCaregiverWatcher(),
    getPatientWatcher(),
    getEmergenciesOfPatientsOfDoctorWatcher(),
    getEmergenciesOfPatientsOfCaregiverWatcher(),
    getDaysWatcher(),
    getAnomalousDaysWatcher(),
    
  ])
}
