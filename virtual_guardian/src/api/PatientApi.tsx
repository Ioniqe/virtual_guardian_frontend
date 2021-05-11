import { FLASK_URL } from "../model/models"

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
    if (response.ok) {
      return response.json()
    }
    else
      return response.status
  }))
}