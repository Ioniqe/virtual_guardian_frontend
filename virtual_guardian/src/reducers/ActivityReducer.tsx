import { ActivityList, DayDetected } from "../model/models"
import { GET_ACTIVITY_LIST_REQUEST, GET_ACTIVITY_LIST_SUCCESS, GET_ACTIVITY_LIST_FAILURE, DETECT_ANOMALY_REQUEST, DETECT_ANOMALY_SUCCESS, DETECT_ANOMALY_FAILURE, TRAIN_MODEL_FAILURE, TRAIN_MODEL_REQUEST, TRAIN_MODEL_SUCCESS, SET_DEFAULT_MODEL_FAILURE, SET_DEFAULT_MODEL_REQUEST, SET_DEFAULT_MODEL_SUCCESS } from "../types/ActivityTypes"

export interface ActivityState {
  loading: boolean,
  activitiesSuccess: ActivityList[],
  error: string,
  detected: DayDetected[],
  trained: number,
  defaultModelSuccess: boolean,
}

const initialState: ActivityState = {
  loading: false,
  activitiesSuccess: [],
  error: '',
  detected: [],
  trained: -1,
  defaultModelSuccess: false,
}

const activityReducer = (state = initialState, action: { type: string, payload: ActivityList[] | string | DayDetected[] | number }) => {
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
        activitiesSuccess: action.payload as ActivityList[],
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
        trained: -1,
        detected: action.payload as DayDetected[],
        error: ''
      }
    case DETECT_ANOMALY_FAILURE:
      return {
        ...state,
        loading: false,
        detected: [],
        error: action.payload as string
      }
    case TRAIN_MODEL_REQUEST:
      return {
        ...state,
        loading: true
      }
    case TRAIN_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
        // detected: [],
        trained: action.payload as number,
        error: ''
      }
    case TRAIN_MODEL_FAILURE:
      return {
        ...state,
        loading: false,
        trained: false,
        error: action.payload as string
      }
    case SET_DEFAULT_MODEL_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SET_DEFAULT_MODEL_SUCCESS:
      return {
        ...state,
        loading: false,
        defaultModelSuccess: true,
        error: ''
      }
    case SET_DEFAULT_MODEL_FAILURE:
      return {
        ...state,
        loading: false,
        defaultModelSuccess: false,
        error: action.payload as string
      }
    default: return state
  }
}

export default activityReducer;