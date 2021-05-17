import { combineReducers } from "redux"
import activityReducer from "../reducers/ActivityReducer"
import allAdminsReducer from "../reducers/AdminReducer"
import caregiverReducer from "../reducers/CaregiverReducer"
import loginReducer from "../reducers/LoginReducer"
import patientReducer from "../reducers/PatientReducer"
import registerReducer from "../reducers/RegisterReducer"

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  allAdmins: allAdminsReducer,
  patient: patientReducer,
  caregiver: caregiverReducer,
  activity: activityReducer,
  
})

export default rootReducer
