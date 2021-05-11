import { combineReducers } from "redux"
import allAdminsReducer from "../reducers/AdminReducer"
import loginReducer from "../reducers/LoginReducer"
import patientReducer from "../reducers/PatientReducer"
import registerReducer from "../reducers/RegisterReducer"

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  allAdmins: allAdminsReducer,
  patient: patientReducer,
})

export default rootReducer
