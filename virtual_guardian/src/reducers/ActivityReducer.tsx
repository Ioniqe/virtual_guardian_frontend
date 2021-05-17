import { Activity } from "../model/models"
import { GET_ACTIVITY_LIST_REQUEST, GET_ACTIVITY_LIST_SUCCESS, GET_ACTIVITY_LIST_FAILURE } from "../types/ActivityTypes"

export interface ActivityState {
  loading: boolean,
  activitiesSuccess: Activity[],
  error: string,
}

const initialState: ActivityState = {
  loading: false,
  activitiesSuccess: [],
  error: '',
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
    default: return state
  }
}

export default activityReducer;