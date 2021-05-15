import { SERVER_URL, User } from "../model/models"

export const getCaregiversAPI = () => {
  return fetch(`${SERVER_URL}/caregiver/all`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

export const deleteCaregiversAPI = (caregiversToBeDeleted: string[]) => {
  return fetch(`${SERVER_URL}/caregiver/delete/bulk`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(caregiversToBeDeleted)
  }).then(response => {
    return response.status
  })
}

export const saveCaregiverAPI = (newCaregiver: User) => {
  return fetch(`${SERVER_URL}/caregiver/new`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCaregiver)
  }).then(response => {
    return response.status
  })
}

export const updateCaregiverAPI = (editedCaregiver: User) => {
  return fetch(`${SERVER_URL}/caregiver/update`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedCaregiver)
  }).then(response => {
    return response.status
  })
}