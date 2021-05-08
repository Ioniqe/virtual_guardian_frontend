import { User } from "../model/models"
import { DELETE_ADMINS_FAILURE, DELETE_ADMINS_REQUEST, DELETE_ADMINS_SUCCESS, GET_ADMINS_FAILURE, GET_ADMINS_REQUEST, GET_ADMINS_SUCCESS } from "../types/AdminTypes"

export interface AdminState {
  loading: boolean,
  adminsSuccess: User[],
  error: string,
  deleteSuccessful: boolean,
}

const initialState: AdminState = {
  loading: false,
  adminsSuccess: [],
  error: '',
  deleteSuccessful: false
}

const allAdminsReducer = (state = initialState, action: { type: string, payload: User[] | string }) => {
  switch (action.type) {
    case GET_ADMINS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminsSuccess: action.payload as User[],
        error: ''
      }
    case GET_ADMINS_FAILURE:
      return {
        ...state,
        loading: false,
        adminsSuccess: false,
        error: action.payload as string
      }
    case DELETE_ADMINS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_ADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        deleteSuccessful: true,
      }
    case DELETE_ADMINS_FAILURE:
      return {
        ...initialState,
        loading: false,
        error: action.payload as string
      }
    default: return state
  }
}

export default allAdminsReducer;