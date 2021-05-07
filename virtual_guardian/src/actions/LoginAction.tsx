import { LoginUser, User } from "../model/models"
import { LOGIN_USER, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REMOVE_LOGGED_USER } from "../types/LoginTypes"

export const loginUser = (user: LoginUser) => {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

//--------------------------------------------- LOGIN USER
export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  }
}

export const loginUserSuccess = (user: User) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user
  }
}

export const loginUserFailure = (error: string) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error
  }
}

//--------------------------------------------- REMOVE USER
export const removeLoggedUser = () => {
  return {
    type: REMOVE_LOGGED_USER,
  }
}
