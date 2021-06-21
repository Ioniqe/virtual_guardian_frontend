import { ActivityList, FLASK_URL, TrainModel } from "../model/models"

export const getActivitiesAPI = (dataset_type: string) => {
  return fetch(`${FLASK_URL}/get_split_data/${dataset_type}`, {
    method: 'GET',
  }).then(response => {
    if (response.ok) 
      return response.json()
    else
      return response.status
  })
}

export const detectAnomaliesAPI = (daysToDetect: ActivityList[]) => {
  return fetch(`${FLASK_URL}/predict/days`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(daysToDetect)
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

export const trainModelAPI = (trainModel: TrainModel) => {
  return fetch(`${FLASK_URL}/train_model`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trainModel)
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

export const setDefaultModelAPI = () => {
  return fetch(`${FLASK_URL}/set_default`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

