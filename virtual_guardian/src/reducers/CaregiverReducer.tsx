import { User } from "../model/models"
import { DELETE_CAREGIVERS_FAILURE, DELETE_CAREGIVERS_REQUEST, DELETE_CAREGIVERS_SUCCESS, GET_CAREGIVERS_LIST_FAILURE, GET_CAREGIVERS_LIST_REQUEST, GET_CAREGIVERS_LIST_SUCCESS, SAVE_CAREGIVER_FAILURE, SAVE_CAREGIVER_REQUEST, SAVE_CAREGIVER_SUCCESS, UPDATE_CAREGIVER_FAILURE, UPDATE_CAREGIVER_REQUEST, UPDATE_CAREGIVER_SUCCESS } from "../types/CaregiverTypes"

export interface CaregiverState {
  loading: boolean,
  caregiversSuccess: User[],
  error: string,
  deleteSuccessful: boolean,
  saveSuccessful: boolean,
  updateSuccessful: boolean,
}

const initialState: CaregiverState = {
  loading: false,
  error: '',
  caregiversSuccess: [],
  deleteSuccessful: false,
  saveSuccessful: false,
  updateSuccessful: false,
}

const caregiverReducer = (state = initialState, action: { type: string, payload: string | User[] }) => {
  switch (action.type) {
    case GET_CAREGIVERS_LIST_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case GET_CAREGIVERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        caregiversSuccess: action.payload as User[],
        error: ''
      }
    case GET_CAREGIVERS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        caregiversSuccess: false,
        error: action.payload as string
      }
    case DELETE_CAREGIVERS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_CAREGIVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        deleteSuccessful: true,
      }
    case DELETE_CAREGIVERS_FAILURE:
      return {
        ...initialState,
        loading: false,
        error: action.payload as string
      }
    case SAVE_CAREGIVER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SAVE_CAREGIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        saveSuccessful: true,
      }
    case SAVE_CAREGIVER_FAILURE:
      return {
        ...initialState,
        loading: false,
        error: action.payload as string
      }
    case UPDATE_CAREGIVER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_CAREGIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        updateSuccessful: true,
      }
    case UPDATE_CAREGIVER_FAILURE:
      return {
        ...initialState,
        loading: false,
        error: action.payload as string
      }
    default: return state
  }
}

export default caregiverReducer