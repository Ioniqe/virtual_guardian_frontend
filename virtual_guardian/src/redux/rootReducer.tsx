import { combineReducers } from "redux"
import abnormalBehaviourReducer from "../reducers/AbnormalBehaviourReducer"
import activityReducer from "../reducers/ActivityReducer"
import allAdminsReducer from "../reducers/AdminReducer"
import caregiverReducer from "../reducers/CaregiverReducer"
import dayReducer from "../reducers/DayReducer"
import labeledDayReducer from "../reducers/LabeledDayReducer"
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
  labeledDay: labeledDayReducer,
  abnormalBehaviour: abnormalBehaviourReducer,
  day: dayReducer,
  
})

export default rootReducer
