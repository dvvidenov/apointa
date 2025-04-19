import { BASE_URL } from './config';

export const getEmployees = async (bulstat = null) => {

  let url = `${BASE_URL}/employees`;

  if (bulstat) {
    url += `?bulstat=${bulstat}`;
  }

  console.log(bulstat);
  
  const response = await fetch(url, {
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json"
    },

  });

  if (!response.ok) {
    console.error('Failed to fetch:', response.statusText);
  }


  const data = await response.json();

  return data.data;

}

export const registerEmployee = async (newEmployee) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(newEmployee),
    mode: 'cors'
  });

  const responseData = await response.json();

  if (!response.ok) throw responseData.errors;


  return responseData.data;
}

export const updateEmployee = async ({ id, ...updatedEmployee }) => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': "Bearer " + sessionStorage.getItem("token"),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(updatedEmployee),
  });

  const responseData = await response.json();

  if (!response.ok) throw responseData.errors;


  return responseData.data;
}
export const deleteEmployee = async ( id ) => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': "Bearer " + sessionStorage.getItem("token"),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });

  const responseData = await response.json();

  if (!response.ok) throw responseData.errors;

  return responseData.data
};