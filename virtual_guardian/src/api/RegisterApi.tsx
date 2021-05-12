import { SpecialUser, SERVER_URL } from "../model/models"

export const saveUserAPI = (user: SpecialUser) => {
  if (user.type === 'admin') 
    return fetch(`${SERVER_URL}/admin/new`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
  
  else
    return fetch(`${SERVER_URL}/doctor/new`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
}