import { SpecialUser } from "../model/models"
import { RESET_REGISTER, SAVE_USER, SAVE_USER_FAILURE, SAVE_USER_REQUEST, SAVE_USER_SUCCESS } from "../types/RegisterTypes"

export const saveUser = (user: SpecialUser) => {
  return {
    type: SAVE_USER,
    payload: user
  }
}

export const resetRegister = () => {
  return {
    type: RESET_REGISTER,
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

export const saveUserFailure = () => {
  return {
    type: SAVE_USER_FAILURE,
  }
}