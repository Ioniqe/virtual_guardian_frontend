import { PREDICT_DISEASE, PREDICT_DISEASE_FAILURE, PREDICT_DISEASE_REQUEST, PREDICT_DISEASE_SUCCESS } from "../types/PatientTypes"

export const predictDisease = (symptomsArr: Array<number>) => {
  return {
    type: PREDICT_DISEASE,
    payload: symptomsArr
  }
}

//--------------------------------------------- PREDICT DISEASE
export const predictDiseaseRequest = () => {
  return {
    type: PREDICT_DISEASE_REQUEST,
  }
}

export const predictDiseaseSuccess = (predictedDisease: string) => {
  return {
    type: PREDICT_DISEASE_SUCCESS,
    payload: predictedDisease
  }
}

export const predictDiseaseFailure = (error: string) => {
  return {
    type: PREDICT_DISEASE_FAILURE,
    payload: error
  }
}
