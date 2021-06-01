import { Emergency } from "../model/models"
import { GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_FAILURE, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_REQUEST, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_SUCCESS, GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_FAILURE, GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_REQUEST, GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_SUCCESS } from "../types/AbnormalBehaviourTypes"

export interface AbnormalBehaviourState {
  loadingAnomalies: boolean,
  loadingEmergencies: boolean,
  errorEmergencies: string,
  emergenciesOfPatientsOfDoctorSuccessful: Emergency[],
  emergenciesOfPatientsOfCaregiverSuccessful: Emergency[],
}

const initialState: AbnormalBehaviourState = {
  loadingAnomalies: false,
  loadingEmergencies: false,
  errorEmergencies: '',
  emergenciesOfPatientsOfDoctorSuccessful: [],
  emergenciesOfPatientsOfCaregiverSuccessful: [],
}

const abnormalBehaviourReducer = (state = initialState, action: { type: string, payload: Emergency[] | string }) => {
  switch (action.type) {
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