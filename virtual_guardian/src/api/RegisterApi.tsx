import { SpecialUser, url } from "../model/models"

export const saveUserAPI = (user: SpecialUser) => {
  if (user.type === 'admin') 
    return fetch(`${url}/admin/new`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
  
  else
    return fetch(`${url}/doctor/new`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
}