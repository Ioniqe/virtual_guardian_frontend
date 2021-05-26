import { ActivityList, FLASK_URL, SERVER_URL } from "../model/models"

export const getActivitiesAPI = () => {
  return fetch(`${SERVER_URL}/activities/readAll`, {
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

