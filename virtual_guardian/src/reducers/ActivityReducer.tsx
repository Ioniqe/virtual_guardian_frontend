import { Activity } from "../model/models"
import { GET_ACTIVITY_LIST_REQUEST, GET_ACTIVITY_LIST_SUCCESS, GET_ACTIVITY_LIST_FAILURE, DETECT_ANOMALY_REQUEST, DETECT_ANOMALY_SUCCESS, DETECT_ANOMALY_FAILURE } from "../types/ActivityTypes"

export interface ActivityState {
  loading: boolean,
  activitiesSuccess: Activity[],
  error: string,
  detected: string,
}

const initialState: ActivityState = {
  loading: false,
  activitiesSuccess: [],
  error: '',
  detected: '',
}

const activityReducer = (state = initialState, action: { type: string, payload: Activity[] | string }) => {
  switch (action.type) {
    case GET_ACTIVITY_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        activitiesSuccess: action.payload as Activity[],
        error: ''
      }
    case GET_ACTIVITY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        activitiesSuccess: false,
        error: action.payload as string
      }
    case DETECT_ANOMALY_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DETECT_ANOMALY_SUCCESS:
      return {
        ...state,
        loading: false,
        detected: action.payload as string,
        error: ''
      }
    case DETECT_ANOMALY_FAILURE:
      return {
        ...state,
        loading: false,
        detected: false,
        error: action.payload as string
      }
    default: return state
  }
}

export default activityReducer;