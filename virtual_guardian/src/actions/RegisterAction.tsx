import { SpecialUser } from "../model/models"
import { SAVE_USER, SAVE_USER_FAILURE, SAVE_USER_REQUEST, SAVE_USER_SUCCESS } from "../types/RegisterTypes"

export const saveUser = (user: SpecialUser) => {
  return {
    type: SAVE_USER,
    payload: user
  }
}

//--------------------------------------------- SAVE USER
export const saveUserRequest = () => {
  return {
    type: SAVE_USER_REQUEST,
  }
}

export const saveUserSuccess = () => {
  return {
    type: SAVE_USER_SUCCESS,
  }
}

export const saveUserFailure = (error: string) => {
  return {
    type: SAVE_USER_FAILURE,
    payload: error
  }
}