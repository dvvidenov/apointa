import { BASE_URL } from './config';

export const addAppointment = async (appointemnt) => {
  console.log(appointemnt);
  
  const response = await fetch(`${BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": '*'
    },
    body: JSON.stringify(appointemnt)
  });

  if (!response.ok) {
    return await response.json()
  }

  const data = await response.json();
  return data.data;

}

export const getAppointments = async () => {


  const response = await fetch(`${BASE_URL}/appointments`, {
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) throw new Error('Failed to fetch');


  const data = await response.json();
  return data.data;
}





export const updateAppointment = async ({ id, ...appt }) => {
  
  const response = await fetch(`${BASE_URL}/appointments/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(appt),
  });
  if (!response.ok) {
    return await response.json()
  }
  const data = await response.json();

  return data;
}


