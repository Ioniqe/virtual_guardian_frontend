import { combineReducers } from "redux"
import allAdminsReducer from "../reducers/AdminReducer"
import loginReducer from "../reducers/LoginReducer"
import registerReducer from "../reducers/RegisterReducer"

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  allAdmins: allAdminsReducer,
  
})

export default rootReducer
