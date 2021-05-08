import { User } from "../model/models"
import { DELETE_ADMINS, DELETE_ADMINS_FAILURE, DELETE_ADMINS_REQUEST, DELETE_ADMINS_SUCCESS, GET_ADMINS, GET_ADMINS_FAILURE, GET_ADMINS_REQUEST, GET_ADMINS_SUCCESS } from "../types/AdminTypes"

//---------------------------------------------  GET ADMINS
export const getAdmins = () => {
  return {
    type: GET_ADMINS,
  }
}

export const getAdminsRequest = () => {
  return {
    type: GET_ADMINS_REQUEST,
  }
}

export const getAdminsSuccess = (user: User[]) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: user
  }
}

export const getAdminsFailure = (error: string) => {
  return {
    type: GET_ADMINS_FAILURE,
    payload: error
  }
}

//---------------------------------------------  DELETE ADMINS
export const deleteAdmins = (adminsToBeDeleted: string[]) => {
  return {
    type: DELETE_ADMINS,
    payload: adminsToBeDeleted,
  }
}

export const deleteAdminsRequest = () => {
  return {
    type: DELETE_ADMINS_REQUEST,
  }
}

export const deleteAdminsSuccess = () => {
  return {
    type: DELETE_ADMINS_SUCCESS,
  }
}

export const deleteAdminsFailure = (error: string) => {
  return {
    type: DELETE_ADMINS_FAILURE,
    payload: error
  }
}