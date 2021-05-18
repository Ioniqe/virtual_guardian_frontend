import { FLASK_URL, MlObject, SERVER_URL } from "../model/models"

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

export const detectAnomalyAPI = (dayToDetect: MlObject) => {
  return fetch(`${FLASK_URL}/predict/day`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dayToDetect)
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

