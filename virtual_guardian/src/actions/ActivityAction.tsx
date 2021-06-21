import { ActivityList, DayDetected, TrainModel } from "../model/models"
import {
  GET_ACTIVITY_LIST, GET_ACTIVITY_LIST_REQUEST, GET_ACTIVITY_LIST_SUCCESS, GET_ACTIVITY_LIST_FAILURE,
  TRAIN_MODEL, TRAIN_MODEL_FAILURE, TRAIN_MODEL_REQUEST, TRAIN_MODEL_SUCCESS, DETECT_ANOMALY, DETECT_ANOMALY_FAILURE, DETECT_ANOMALY_REQUEST, DETECT_ANOMALY_SUCCESS, SET_DEFAULT_MODEL, SET_DEFAULT_MODEL_FAILURE, SET_DEFAULT_MODEL_REQUEST, SET_DEFAULT_MODEL_SUCCESS
} from "../types/ActivityTypes"

//---------------------------------------------  GET ACTIVITIES
export const getActivities = (dataset_type: string) => {
  return {
    type: GET_ACTIVITY_LIST,
    payload: dataset_type
  }
}

export const getActivitiesRequest = () => {
  return {
    type: GET_ACTIVITY_LIST_REQUEST,
  }
}

export const getActivitiesSuccess = (activities: ActivityList[]) => {
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
export const detectAnomalies = (dayToDetect: ActivityList[]) => {
  return {
    type: DETECT_ANOMALY,
    payload: dayToDetect
  }
}

export const detectAnomaliesRequest = () => {
  return {
    type: DETECT_ANOMALY_REQUEST,
  }
}

export const detectAnomaliesSuccess = (result: DayDetected[]) => {
  return {
    type: DETECT_ANOMALY_SUCCESS,
    payload: result
  }
}

export const detectAnomaliesFailure = (error: string) => {
  return {
    type: DETECT_ANOMALY_FAILURE,
    payload: error
  }
}

//---------------------------------------------  TRAIN MODEL
export const trainModel = (trainModel: TrainModel) => {
  return {
    type: TRAIN_MODEL,
    payload: trainModel
  }
}

export const trainModelRequest = () => {
  return {
    type: TRAIN_MODEL_REQUEST,
  }
}

export const trainModelSuccess = (score: number) => {
  return {
    type: TRAIN_MODEL_SUCCESS,
    payload: score
  }
}

export const trainModelFailure = (error: string) => {
  return {
    type: TRAIN_MODEL_FAILURE,
    payload: error
  }
}

//---------------------------------------------  SET DEFAULT MODEL setDefaultModel
export const setDefaultModel = () => {
  return {
    type: SET_DEFAULT_MODEL,
  }
}

export const setDefaultModelRequest = () => {
  return {
    type: SET_DEFAULT_MODEL_REQUEST,
  }
}

export const setDefaultModelSuccess = () => {
  return {
    type: SET_DEFAULT_MODEL_SUCCESS,
  }
}

export const setDefaultModelFailure = (error: string) => {
  return {
    type: SET_DEFAULT_MODEL_FAILURE,
    payload: error
  }
}