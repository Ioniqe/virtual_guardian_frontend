import { SERVER_URL } from "../model/models"

export const getLabeledDaysListAPI = (label: string) => {
  return fetch(`${SERVER_URL}/labeled_days/${label}`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}