import { FLASK_URL, SERVER_URL, User } from "../model/models"

export const predictDiseaseAPI = (symptomsArr: Array<string>) => {
  let arr = [symptomsArr]

  return Promise.resolve(fetch(`${FLASK_URL}/predict/disease`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arr)
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  }))
}

export const getPatientsAPI = (doctorId: string) => {
  return fetch(`${SERVER_URL}/patient/all/${doctorId}`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}

export const deletePatientsAPI = (patientsToBeDeleted: string[]) => {
  return fetch(`${SERVER_URL}/patient/delete/bulk`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientsToBeDeleted)
  }).then(response => {
    return response.status
  })
}

export const savePatientAPI = (payload: { 'patient': User, 'doctorId': string }) => {
  return fetch(`${SERVER_URL}/patient/new/${payload.doctorId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload.patient)
  }).then(response => {
    return response.status
  })
}

export const updatePatientAPI = (payload: User) => {
  return fetch(`${SERVER_URL}/patient/update`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  }).then(response => {
    return response.status
  })
}

export const sendEmergencyAPI = (patientId: string) => {
  return fetch(`${SERVER_URL}/sendEmergency/${patientId}`, {
    method: 'GET',
  }).then(response => {
    return response.status
  })
}

export const assignCaregiverAPI = (payload: { 'caregiverId': string, 'patientId': string }) => {
  return fetch(`${SERVER_URL}/patient/set_caregiver/${payload.patientId}/${payload.caregiverId !== '' ? payload.caregiverId : '-'}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    return response.status
  })
}

export const getPatientAPI = (patientId: string) => {
  return fetch(`${SERVER_URL}/patient/${patientId}`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })
}