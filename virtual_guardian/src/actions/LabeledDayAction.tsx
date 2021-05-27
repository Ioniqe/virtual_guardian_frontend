import { LabeledDay } from "../model/models"
import { GET_LABELED_DAYS_LIST, GET_LABELED_DAYS_LIST_REQUEST, GET_LABELED_DAYS_LIST_SUCCESS, GET_LABELED_DAYS_LIST_FAILURE, SAVE_LABELED_DAYS_LIST, SAVE_LABELED_DAYS_LIST_FAILURE, SAVE_LABELED_DAYS_LIST_REQUEST, SAVE_LABELED_DAYS_LIST_SUCCESS } from "../types/LabeledDayTypes"

//---------------------------------------------  GET LABELED DAYS
export const getLabeledDaysList = (label: string) => {
  return {
    type: GET_LABELED_DAYS_LIST,
    payload: label
  }
}

export const getLabeledDaysListRequest = () => {
  return {
    type: GET_LABELED_DAYS_LIST_REQUEST,
  }
}

export const getLabeledDaysListSuccess = (labeledDays: LabeledDay[]) => {
  return {
    type: GET_LABELED_DAYS_LIST_SUCCESS,
    payload: labeledDays
  }
}

export const getLabeledDaysListFailure = (error: string) => {
  return {
    type: GET_LABELED_DAYS_LIST_FAILURE,
    payload: error
  }
}

//---------------------------------------------  SAVE LABELED DAYS
export const saveAnomalousDays = (selectedDays: Date[]) => {
  return {
    type: SAVE_LABELED_DAYS_LIST,
    payload: selectedDays
  }
}

export const saveAnomalousDaysRequest = () => {
  return {
    type: SAVE_LABELED_DAYS_LIST_REQUEST,
  }
}

export const saveAnomalousDaysSuccess = () => {
  return {
    type: SAVE_LABELED_DAYS_LIST_SUCCESS,
  }
}

export const saveAnomalousDaysFailure = (error: string) => {
  return {
    type: SAVE_LABELED_DAYS_LIST_FAILURE,
    payload: error
  }
}