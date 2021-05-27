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

export const saveSelectedDaysAsAnomalousAPI = (selectedDays : Date[]) => {
  return fetch(`${SERVER_URL}/labeled_days/set_selected/anomalous`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selectedDays)
  }).then(response => {
    return response.status
  })
}