import { User } from "../model/models"
import { DELETE_CAREGIVERS, DELETE_CAREGIVERS_FAILURE, DELETE_CAREGIVERS_REQUEST, DELETE_CAREGIVERS_SUCCESS, GET_CAREGIVERS_LIST, GET_CAREGIVERS_LIST_FAILURE, GET_CAREGIVERS_LIST_REQUEST, GET_CAREGIVERS_LIST_SUCCESS, SAVE_CAREGIVER, SAVE_CAREGIVER_FAILURE, SAVE_CAREGIVER_REQUEST, SAVE_CAREGIVER_SUCCESS } from "../types/CaregiverTypes"

//--------------------------------------------- FETCH Caregivers
export const getCaregiversList = () => {
  return {
    type: GET_CAREGIVERS_LIST,
  }
}

export const getCaregiversListRequest = () => {
  return {
    type: GET_CAREGIVERS_LIST_REQUEST,
  }
}

export const getCaregiversListSuccess = (CaregiversList: User[]) => {
  return {
    type: GET_CAREGIVERS_LIST_SUCCESS,
    payload: CaregiversList
  }
}

export const getCaregiversListFailure = (error: string) => {
  return {
    type: GET_CAREGIVERS_LIST_FAILURE,
    payload: error
  }
}

//---------------------------------------------  DELETE Caregivers
export const deleteCaregivers = (CaregiversToBeDeleted: string[]) => {
  return {
    type: DELETE_CAREGIVERS,
    payload: CaregiversToBeDeleted,
  }
}

export const deleteCaregiversRequest = () => {
  return {
    type: DELETE_CAREGIVERS_REQUEST,
  }
}

export const deleteCaregiversSuccess = () => {
  return {
    type: DELETE_CAREGIVERS_SUCCESS,
  }
}

export const deleteCaregiversFailure = (error: string) => {
  return {
    type: DELETE_CAREGIVERS_FAILURE,
    payload: error
  }
}

//---------------------------------------------  SAVE Caregivers
export const saveCaregiver = (newCaregiver: User) => {
  console.log(newCaregiver);
  return {
    type: SAVE_CAREGIVER,
    payload: newCaregiver,
  }
}

export const saveCaregiverRequest = () => {
  return {
    type: SAVE_CAREGIVER_REQUEST,
  }
}

export const saveCaregiversuccess = () => {
  return {
    type: SAVE_CAREGIVER_SUCCESS,
  }
}

export const saveCaregiverFailure = (error: string) => {
  return {
    type: SAVE_CAREGIVER_FAILURE,
    payload: error
  }
}