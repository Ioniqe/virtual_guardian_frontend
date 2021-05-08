import { User } from "../model/models"
import { GET_ADMINS_FAILURE, GET_ADMINS_REQUEST, GET_ADMINS_SUCCESS } from "../types/AdminTypes"

export interface AdminState {
  loading: boolean,
  adminsSuccess: User[],
  error: string
}

const initialState: AdminState = {
  loading: false,
  adminsSuccess: [],
  error: ''
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
        loading: false,
        adminsSuccess: action.payload as User[],
        error: ''
      }
    case GET_ADMINS_FAILURE:
      return {
        loading: false,
        adminsSuccess: false,
        error: action.payload as string
      }
    default: return state
  }
}

export default allAdminsReducer;