import { BASE_URL } from './config';


export const updateProfile = async (id, info) => {

  const response = await fetch(`${BASE_URL}/user/` + id, {
    method: 'PUT',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(info),
  });
  if (!response.ok) {
    return await response.json()
  }

  return await response.json();
}

export const loginUser = async ({ email, password }) => {

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Грешни данни за вход');


  return await response.json();


}