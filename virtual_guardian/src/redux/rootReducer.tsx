import { combineReducers } from "redux"
import registerReducer from "../reducers/RegisterReducer"

const rootReducer = combineReducers({
  register: registerReducer,
  
})

export default rootReducer
