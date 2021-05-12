import { LoginUser, SERVER_URL } from "../model/models"

export const loginUserAPI = (user: LoginUser) => {

  return fetch(`${SERVER_URL}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if (response.ok)
        return response.json()
      else
        return response.status
    })

}