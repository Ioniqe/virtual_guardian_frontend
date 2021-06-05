import { SERVER_URL } from "../model/models"

export const getDaysAPI = () => {
  return fetch(`${SERVER_URL}/day/get_all`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

export const getAnomalousDaysAPI = () => {
  return fetch(`${SERVER_URL}/day/get_all/anomalous`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}