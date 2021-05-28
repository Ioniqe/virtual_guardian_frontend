import { User } from "../model/models"
import { DELETE_PATIENTS_FAILURE, DELETE_PATIENTS_REQUEST, DELETE_PATIENTS_SUCCESS, GET_PATIENTS_LIST_FAILURE, GET_PATIENTS_LIST_REQUEST, GET_PATIENTS_LIST_SUCCESS, PREDICT_DISEASE_FAILURE, PREDICT_DISEASE_REQUEST, PREDICT_DISEASE_SUCCESS, SAVE_PATIENT_FAILURE, SAVE_PATIENT_REQUEST, SAVE_PATIENT_SUCCESS, SEND_EMERGENCY_FAILURE, SEND_EMERGENCY_REQUEST, SEND_EMERGENCY_SUCCESS, UPDATE_PATIENT_FAILURE, UPDATE_PATIENT_REQUEST, UPDATE_PATIENT_SUCCESS } from "../types/PatientTypes"

export interface PatientState {
  loading: boolean,
  diseasePrediction: string,
  patientsSuccess: User[],
  error: string,
  deleteSuccessful: boolean,
  saveSuccessful: boolean,
  updateSuccessful: boolean,
  sendEmergencySuccessful: boolean,
}

const initialState: PatientState = {
  loading: false,
  diseasePrediction: '',
  error: '',
  patientsSuccess: [],
  deleteSuccessful: false,
  saveSuccessful: false,
  updateSuccessful: false,
  sendEmergencySuccessful: false,
}

const patientReducer = (state = initialState, action: { type: string, payload: string | User[] }) => {
  switch (action.type) {
    case PREDICT_DISEASE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PREDICT_DISEASE_SUCCESS:
      return {
        loading: false,
        diseasePrediction: action.payload as string,
        error: ''
      }
    case PREDICT_DISEASE_FAILURE:
      return {
        loading: false,
        diseasePrediction: false,
        error: action.payload as string
      }
    case GET_PATIENTS_LIST_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case GET_PATIENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        patientsSuccess: action.payload as User[],
        error: ''
      }
    case GET_PATIENTS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        patientsSuccess: false,
        error: action.payload as string
      }
      case DELETE_PATIENTS_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case DELETE_PATIENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: '',
          deleteSuccessful: true,
        }
      case DELETE_PATIENTS_FAILURE:
        return {
          ...initialState,
          loading: false,
          error: action.payload as string
        }
      case SAVE_PATIENT_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case SAVE_PATIENT_SUCCESS:
        return {
          ...state,
          loading: false,
          error: '',
          saveSuccessful: true,
        }
      case SAVE_PATIENT_FAILURE:
        return {
          ...initialState,
          loading: false,
          error: action.payload as string
        }
      case UPDATE_PATIENT_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case UPDATE_PATIENT_SUCCESS:
        return {
          ...state,
          loading: false,
          error: '',
          updateSuccessful: true,
        }
      case UPDATE_PATIENT_FAILURE:
        return {
          ...initialState,
          loading: false,
          error: action.payload as string
        }
      case SEND_EMERGENCY_REQUEST:
        return {
          ...state,
          loading: true,
          sendEmergencySuccessful: false,
        }
    case SEND_EMERGENCY_SUCCESS:
        return {
          ...state,
          loading: false,
          error: '',
          sendEmergencySuccessful: true,
        }
      case SEND_EMERGENCY_FAILURE:
        return {
          ...initialState,
          loading: false,
          error: action.payload as string,
          sendEmergencySuccessful: false,
        }
    default: return state
  }
}

export default patientReducer