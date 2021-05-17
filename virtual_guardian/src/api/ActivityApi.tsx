import { SERVER_URL } from "../model/models"

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