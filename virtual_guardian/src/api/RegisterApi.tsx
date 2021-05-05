import { SpecialUser, url } from "../model/models"

export const saveUserAPI = (person: SpecialUser) => {
  if(person.type === 'admin')
    return fetch(`${url}/admin/new`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person)
    }).then(response => response.json())
  
    return fetch(`${url}/doctor/new`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person)
    }).then(response => response.json())
}