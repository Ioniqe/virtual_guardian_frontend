import { PREDICT_DISEASE_FAILURE, PREDICT_DISEASE_REQUEST, PREDICT_DISEASE_SUCCESS } from "../types/PatientTypes"

export interface PatientState {
  loading: boolean,
  diseasePrediction: string,
  error: string
}

const initialState: PatientState = {
  loading: false,
  diseasePrediction: '',
  error: ''
}

const patientReducer = (state = initialState, action: { type: string, payload: string }) => {
  switch (action.type) {
    case PREDICT_DISEASE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PREDICT_DISEASE_SUCCESS:
      return {
        loading: false,
        diseasePrediction: action.payload,
        error: ''
      }
    case PREDICT_DISEASE_FAILURE:
      return {
        loading: false,
        diseasePrediction: false,
        error: action.payload
      }
    default: return state
  }
}

export default patientReducer