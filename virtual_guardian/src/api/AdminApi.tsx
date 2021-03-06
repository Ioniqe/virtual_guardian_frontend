import { SERVER_URL } from "../model/models"

export const getAdminsAPI = () => {
  return fetch(`${SERVER_URL}/admin/all`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

export const deleteAdminsAPI = (adminsToBeDeleted: string[]) => {
  return fetch(`${SERVER_URL}/admin/delete/bulk`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adminsToBeDeleted)
  }).then(response => {
    return response.status
  })
}
