import { Activity } from "../model/models"
import { GET_ACTIVITY_LIST, GET_ACTIVITY_LIST_REQUEST, GET_ACTIVITY_LIST_SUCCESS, GET_ACTIVITY_LIST_FAILURE } from "../types/ActivityTypes"

//---------------------------------------------  GET ACTIVITIES
export const getActivities = () => {
  return {
    type: GET_ACTIVITY_LIST,
  }
}

export const getActivitiesRequest = () => {
  return {
    type: GET_ACTIVITY_LIST_REQUEST,
  }
}

export const getActivitiesSuccess = (activities: Activity[]) => {
  return {
    type: GET_ACTIVITY_LIST_SUCCESS,
    payload: activities
  }
}

export const getActivitiesFailure = (error: string) => {
  return {
    type: GET_ACTIVITY_LIST_FAILURE,
    payload: error
  }
}