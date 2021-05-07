import { User } from "../model/models";
import { LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REMOVE_LOGGED_USER } from "../types/LoginTypes";

let initialUser: User = {
  id: '',
  doctorId: '',
  caregiverId: '',
  address: '',
  username: '',
  password: '',
  firstname: '',
  lastname: '',
  birthday: new Date(),
  gender: '',
  type: '',
}

export interface LoginState {
  loading: boolean,
  loginSuccessful: User,
  error: string
}

const initialState: LoginState = {
  loading: false,
  loginSuccessful: initialUser,
  error: ''
}

const loginReducer = (state = initialState, action: { type: string, payload: string | User}) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGIN_USER_SUCCESS:
      let user: User = action.payload as User;
      return {
        loading: false,
        loginSuccessful: user,
        error: ''
      }
    case LOGIN_USER_FAILURE:
      return {
        loading: false,
        loginSuccessful: initialUser,
        error: action.payload
      }
    case REMOVE_LOGGED_USER:
      return {
        ...initialState
      }
    default: return state
  }
}

export default loginReducer