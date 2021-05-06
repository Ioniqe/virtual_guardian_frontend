import { SAVE_USER_FAILURE, SAVE_USER_REQUEST, SAVE_USER_SUCCESS } from "../types/RegisterTypes"

export interface RegisterState {
  loading: boolean,
  registerSuccessful: boolean,
  error: string
}

const initialState: RegisterState = {
  loading: false,
  registerSuccessful: false,
  error: ''
}

const registerReducer = (state = initialState, action: { type: string, payload: string }) => {
  switch (action.type) {
    case SAVE_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SAVE_USER_SUCCESS:
      return {
        loading: false,
        registerSuccessful: true,
        error: ''
      }
    case SAVE_USER_FAILURE:
      return {
        loading: false,
        registerSuccessful: false,
        error: action.payload
      }
    default: return state
  }
}

export default registerReducer