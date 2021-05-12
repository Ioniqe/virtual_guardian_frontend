import { User } from "../model/models"
import { DELETE_PATIENTS, DELETE_PATIENTS_FAILURE, DELETE_PATIENTS_REQUEST, DELETE_PATIENTS_SUCCESS, GET_PATIENTS_LIST, GET_PATIENTS_LIST_FAILURE, GET_PATIENTS_LIST_REQUEST, GET_PATIENTS_LIST_SUCCESS, PREDICT_DISEASE, PREDICT_DISEASE_FAILURE, PREDICT_DISEASE_REQUEST, PREDICT_DISEASE_SUCCESS, SAVE_PATIENT, SAVE_PATIENT_FAILURE, SAVE_PATIENT_REQUEST, SAVE_PATIENT_SUCCESS } from "../types/PatientTypes"

//--------------------------------------------- PREDICT DISEASE
export const predictDisease = (symptomsArr: Array<number>) => {
  return {
    type: PREDICT_DISEASE,
    payload: symptomsArr
  }
}

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

//--------------------------------------------- FETCH PATIENTS
export const getPatientsList = (doctorId: string) => {
  return {
    type: GET_PATIENTS_LIST,
    payload: doctorId
  }
}


export const getPatientsListRequest = () => {
  return {
    type: GET_PATIENTS_LIST_REQUEST,
  }
}

export const getPatientsListSuccess = (patientsList: User[]) => {
  return {
    type: GET_PATIENTS_LIST_SUCCESS,
    payload: patientsList
  }
}

export const getPatientsListFailure = (error: string) => {
  return {
    type: GET_PATIENTS_LIST_FAILURE,
    payload: error
  }
}

//---------------------------------------------  DELETE PATIENTS
export const deletePatients = (patientsToBeDeleted: string[]) => {
  return {
    type: DELETE_PATIENTS,
    payload: patientsToBeDeleted,
  }
}

export const deletePatientsRequest = () => {
  return {
    type: DELETE_PATIENTS_REQUEST,
  }
}

export const deletePatientsSuccess = () => {
  return {
    type: DELETE_PATIENTS_SUCCESS,
  }
}

export const deletePatientsFailure = (error: string) => {
  return {
    type: DELETE_PATIENTS_FAILURE,
    payload: error
  }
}

//---------------------------------------------  DELETE PATIENTS
export const savePatient = (newPatient: User, doctorId: string) => {
  return {
    type: SAVE_PATIENT,
    payload: { 'patient': newPatient, 'doctorId': doctorId },
  }
}

export const savePatientRequest = () => {
  return {
    type: SAVE_PATIENT_REQUEST,
  }
}

export const savePatientSuccess = () => {
  return {
    type: SAVE_PATIENT_SUCCESS,
  }
}

export const savePatientFailure = (error: string) => {
  return {
    type: SAVE_PATIENT_FAILURE,
    payload: error
  }
}