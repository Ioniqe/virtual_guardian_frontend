import { Activity, MlObject } from "../model/models"
import { GET_ACTIVITY_LIST, GET_ACTIVITY_LIST_REQUEST, GET_ACTIVITY_LIST_SUCCESS, GET_ACTIVITY_LIST_FAILURE, DETECT_ANOMALY, DETECT_ANOMALY_FAILURE, DETECT_ANOMALY_REQUEST, DETECT_ANOMALY_SUCCESS } from "../types/ActivityTypes"

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

//---------------------------------------------  DETECT ANOMALIES
export const detectAnomaly = (dayToDetect: MlObject) => {
  return {
    type: DETECT_ANOMALY,
    payload: dayToDetect
  }
}

export const detectAnomalyRequest = () => {
  return {
    type: DETECT_ANOMALY_REQUEST,
  }
}

export const detectAnomalySuccess = (result: string) => {
  return {
    type: DETECT_ANOMALY_SUCCESS,
    payload: result
  }
}

export const detectAnomalyFailure = (error: string) => {
  return {
    type: DETECT_ANOMALY_FAILURE,
    payload: error
  }
}