import { Anomaly, Emergency } from "../model/models"
import { GET_ANOMALIES_REQUEST, GET_ANOMALIES_SUCCESS, GET_ANOMALIES_FAILURE, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_FAILURE, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_REQUEST, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_SUCCESS, GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_FAILURE, GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_REQUEST, GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_SUCCESS } from "../types/AbnormalBehaviourTypes"

export interface AbnormalBehaviourState {
  loadingAnomalies: boolean,
  loadingEmergencies: boolean,
  anomaliesSuccessful: Anomaly[],
  errorAnomalies: string,
  errorEmergencies: string,
  emergenciesOfPatientsOfDoctorSuccessful: Emergency[],
  emergenciesOfPatientsOfCaregiverSuccessful: Emergency[],
}

const initialState: AbnormalBehaviourState = {
  loadingAnomalies: false,
  loadingEmergencies: false,
  anomaliesSuccessful: [],
  errorAnomalies: '',
  errorEmergencies: '',
  emergenciesOfPatientsOfDoctorSuccessful: [],
  emergenciesOfPatientsOfCaregiverSuccessful: [],
}

const abnormalBehaviourReducer = (state = initialState, action: { type: string, payload: Anomaly[] | Emergency[] |string }) => {
  switch (action.type) {
    case GET_ANOMALIES_REQUEST:
      return {
        ...state,
        loadingAnomalies: true
      }
    case GET_ANOMALIES_SUCCESS:
      return {
        ...state,
        loadingAnomalies: false,
        anomaliesSuccessful: action.payload as Anomaly[],
        errorAnomalies: ''
      }
    case GET_ANOMALIES_FAILURE:
      return {
        ...state,
        loadingAnomalies: false,
        anomaliesSuccessful: [],
        errorAnomalies: action.payload as string
      }
    case GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_REQUEST:
      return {
        ...state,
        loadingEmergencies: true
      }
    case GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_SUCCESS:
      return {
        ...state,
        loadingEmergencies: false,
        emergenciesOfPatientsOfDoctorSuccessful: action.payload as Emergency[],
        errorEmergencies: ''
      }
    case GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_FAILURE:
      return {
        ...state,
        loadingEmergencies: false,
        emergenciesOfPatientsOfDoctorSuccessful: [],
        errorEmergencies: action.payload as string
      }
    case GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_REQUEST:
      return {
        ...state,
        loadingEmergencies: true
      }
    case GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_SUCCESS:
      return {
        ...state,
        loadingEmergencies: false,
        emergenciesOfPatientsOfCaregiverSuccessful: action.payload as Emergency[],
        errorEmergencies: ''
      }
    case GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_FAILURE:
      return {
        ...state,
        loadingEmergencies: false,
        emergenciesOfPatientsOfCaregiverSuccessful: [],
        errorEmergencies: action.payload as string
      }
    default: return state
  }
}

export default abnormalBehaviourReducer;