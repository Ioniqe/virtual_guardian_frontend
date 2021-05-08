import { url } from "../model/models"

export const getAdminsAPI = () => {

  return fetch(`${url}/admin/all`, {
    method: 'GET',
  }).then(response => {
    if (response.ok)
      return response.json()
    else
      return response.status
  })

}
