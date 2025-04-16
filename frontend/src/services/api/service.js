import { BASE_URL } from './config';


export const addService = async (newService) => {

  const response = await fetch(`${BASE_URL}/services`, {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(newService),

  });


  if (!response.ok) {
    return await response.json()
  }
  const data = await response.json();
  return data;

}


export const getServices = async () => {

  const response = await fetch(`${BASE_URL}/services`, {
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    }
  });

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data.data;

}

export const getService = async (id) => {

  const response = await fetch(`${BASE_URL}/services/${id}`, {
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data.data;

}

export const updateService = async ({ id, ...updatedService }) => {

  const response = await fetch(`${BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(updatedService)
  });
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data.data;
}

export const deleteService = async (id) => {
  const response = await fetch(`${BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
    }
  });

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data.data;
}