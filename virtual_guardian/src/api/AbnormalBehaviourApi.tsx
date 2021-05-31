import { SERVER_URL } from "../model/models"

export const getAnomaliesAPI = () => {
  return fetch(`${SERVER_URL}/anomaly/get_all`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

export const getEmergenciesOfPatientsOfDoctorAPI = (doctorId: string) => {
  return fetch(`${SERVER_URL}/emergency/get_all/doctor/${doctorId}`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

export const getEmergenciesOfPatientsOfCaregiverAPI = (caregiverId: string) => {
  return fetch(`${SERVER_URL}/emergency/get_all/caregiver/${caregiverId}`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

