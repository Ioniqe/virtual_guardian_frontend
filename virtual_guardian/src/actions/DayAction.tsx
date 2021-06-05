import { Day } from "../model/models"
import { GET_ANOMALOUS_DAYS_LIST, GET_ANOMALOUS_DAYS_LIST_FAILURE, GET_ANOMALOUS_DAYS_LIST_REQUEST, GET_ANOMALOUS_DAYS_LIST_SUCCESS, GET_DAYS_LIST, GET_DAYS_LIST_FAILURE, GET_DAYS_LIST_REQUEST, GET_DAYS_LIST_SUCCESS } from "../types/DayTypes"

//--------------------------------------------- FETCH Days
export const getDaysList = () => {
  return {
    type: GET_DAYS_LIST,
  }
}

export const getDaysListRequest = () => {
  return {
    type: GET_DAYS_LIST_REQUEST,
  }
}

export const getDaysListSuccess = (days: Day[]) => {
  return {
    type: GET_DAYS_LIST_SUCCESS,
    payload: days
  }
}

export const getDaysListFailure = (error: string) => {
  return {
    type: GET_DAYS_LIST_FAILURE,
    payload: error
  }
}

//--------------------------------------------- FETCH Anomalous Days
export const getAnomalousDaysList = () => {
  return {
    type: GET_ANOMALOUS_DAYS_LIST,
  }
}

export const getAnomalousDaysListRequest = () => {
  return {
    type: GET_ANOMALOUS_DAYS_LIST_REQUEST,
  }
}

export const getAnomalousDaysListSuccess = (days: Day[]) => {
  return {
    type: GET_ANOMALOUS_DAYS_LIST_SUCCESS,
    payload: days
  }
}

export const getAnomalousDaysListFailure = (error: string) => {
  return {
    type: GET_ANOMALOUS_DAYS_LIST_FAILURE,
    payload: error
  }
}