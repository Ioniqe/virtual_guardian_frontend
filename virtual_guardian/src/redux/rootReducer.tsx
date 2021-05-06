import { combineReducers } from "redux"
import loginReducer from "../reducers/LoginReducer"
import registerReducer from "../reducers/RegisterReducer"

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  
})

export default rootReducer
