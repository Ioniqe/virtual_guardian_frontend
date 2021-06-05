import { Day } from "../model/models"
import { GET_DAYS_LIST_REQUEST, GET_DAYS_LIST_SUCCESS, GET_DAYS_LIST_FAILURE, GET_ANOMALOUS_DAYS_LIST_FAILURE, GET_ANOMALOUS_DAYS_LIST_REQUEST, GET_ANOMALOUS_DAYS_LIST_SUCCESS } from "../types/DayTypes"

export interface DayState {
  loading: boolean,
  daysSuccess: Day[],
  anomalousDaysSuccess: Day[],
  error: string,
}

const initialState: DayState = {
  loading: false,
  error: '',
  daysSuccess: [],
  anomalousDaysSuccess: [],
}

const dayReducer = (state = initialState, action: { type: string, payload: string | Day[] }) => {
  switch (action.type) {
    case GET_DAYS_LIST_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case GET_DAYS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        daysSuccess: action.payload as Day[],
        error: ''
      }
    case GET_DAYS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        daysSuccess: false,
        error: action.payload as string
      }
    case GET_ANOMALOUS_DAYS_LIST_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case GET_ANOMALOUS_DAYS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        anomalousDaysSuccess: action.payload as Day[],
        error: ''
      }
    case GET_ANOMALOUS_DAYS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        anomalousDaysSuccess: false,
        error: action.payload as string
      }
    default: return state
  }
}

export default dayReducer