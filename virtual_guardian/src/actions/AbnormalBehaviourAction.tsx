import { Emergency } from "../model/models"
import { GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER, GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_REQUEST, GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_SUCCESS, GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_FAILURE, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_FAILURE, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_REQUEST, GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_SUCCESS } from "../types/AbnormalBehaviourTypes"

//---------------------------------------------  GET EMERGENCIES OF PATIENTS OF DOCTOR LIST
export const getEmergenciesOfPatientsOfDoctor = (doctorId: string) => {
  return {
    type: GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR,
    payload: doctorId
  }
}

export const getEmergenciesOfPatientsOfDoctorRequest = () => {
  return {
    type: GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_REQUEST,
  }
}

export const getEmergenciesOfPatientsOfDoctorSuccess = (emergencies: Emergency[]) => {
  return {
    type: GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_SUCCESS,
    payload: emergencies
  }
}

export const getEmergenciesOfPatientsOfDoctorFailure = (error: string) => {
  return {
    type: GET_EMERGENCIES_OF_PATIENTS_OF_DOCTOR_FAILURE,
    payload: error
  }
}

//---------------------------------------------  GET EMERGENCIES OF PATIENTS OF CAREGIVER LIST
export const getEmergenciesOfPatientsOfCaregiver = (caregiverId: string) => {
  return {
    type: GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER,
    payload: caregiverId
  }
}

export const getEmergenciesOfPatientsOfCaregiverRequest = () => {
  return {
    type: GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_REQUEST,
  }
}

export const getEmergenciesOfPatientsOfCaregiverSuccess = (emergencies: Emergency[]) => {
  return {
    type: GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_SUCCESS,
    payload: emergencies
  }
}

export const getEmergenciesOfPatientsOfCaregiverFailure = (error: string) => {
  return {
    type: GET_EMERGENCIES_OF_PATIENTS_OF_CAREGIVER_FAILURE,
    payload: error
  }
}