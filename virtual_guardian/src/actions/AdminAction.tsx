import { User } from "../model/models"
import { GET_ADMINS, GET_ADMINS_FAILURE, GET_ADMINS_REQUEST, GET_ADMINS_SUCCESS } from "../types/AdminTypes"

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