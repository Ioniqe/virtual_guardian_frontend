import { User } from "../model/models";
import { LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REMOVE_LOGGED_USER } from "../types/LoginTypes";

let loggedUser = JSON.parse(sessionStorage.getItem('user') as string);

let emptyUser: User = {
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

let initialUser: User = {
  id:           loggedUser !== null ? loggedUser.id : '',
  doctorId:     (loggedUser !== null && loggedUser.doctorId !== null) ? loggedUser.doctorId : '',
  caregiverId:  (loggedUser !== null && loggedUser.caregiverId !== null) ? loggedUser.caregiverId : '',
  address:      (loggedUser !== null && loggedUser.address !== null) ? loggedUser.address : '',
  username:     loggedUser !== null ? loggedUser.username : '',
  password:     loggedUser !== null ? loggedUser.password : '',
  firstname:    loggedUser !== null ? loggedUser.firstname : '',
  lastname:     loggedUser !== null ? loggedUser.lastname : '',
  birthday:     loggedUser !== null ? loggedUser.birthday : new Date(),
  gender:       loggedUser !== null ? loggedUser.gender : '',
  type:         loggedUser !== null ? loggedUser.type : '',
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

const loginReducer = (state = initialState, action: { type: string, payload: User}) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOGIN_USER_SUCCESS:
      let user: User = action.payload;
      return {
        loading: false,
        loginSuccessful: user,
        error: ''
      }
    case LOGIN_USER_FAILURE:
      return {
        loading: false,
        loginSuccessful: emptyUser,
        error: action.payload
      }
    case REMOVE_LOGGED_USER:
      return {
        loading: false,
        loginSuccessful: emptyUser,
        error: ''
      }
    default: return state
  }
}

export default loginReducer