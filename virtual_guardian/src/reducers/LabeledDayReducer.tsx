import { LabeledDay } from "../model/models"
import { GET_LABELED_DAYS_LIST_REQUEST, GET_LABELED_DAYS_LIST_SUCCESS, GET_LABELED_DAYS_LIST_FAILURE } from "../types/LabeledDayTypes"

export interface LabeledDayState {
  loading: boolean,
  labeledDaysSuccess: LabeledDay[],
  error: string,
}

const initialState: LabeledDayState = {
  loading: false,
  labeledDaysSuccess: [],
  error: '',
}

const labeledDayReducer = (state = initialState, action: { type: string, payload: string | LabeledDay[] }) => {
  switch (action.type) {
    case GET_LABELED_DAYS_LIST_REQUEST:
      return {
        ...initialState,
        loading: true
      }
    case GET_LABELED_DAYS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        labeledDaysSuccess: action.payload as LabeledDay[],
        error: ''
      }
    case GET_LABELED_DAYS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        labeledDaysSuccess: [],
        error: action.payload as string
      }
    default: return state
  }
}

export default labeledDayReducer