const BASE_URL = "http://127.0.0.1:8000/api";

export const getBusinesses = async () => {
  const response = await fetch(`${BASE_URL}/businesses`);
  if (!response.ok) {
    console.error('Failed to fetch:', response.statusText);
    return [];
  }
  const data = await response.json();
  return data.data;

}

export const getSpecificBusinesses = async (name) => {
  const response = await fetch(`${BASE_URL}/businesses/${name}`);
  if (!response.ok) {
    console.error('Failed to fetch:', response.statusText);
  }
  const data = await response.json();
  return data.data;

}



export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    console.error('Failed to fetch:', response.statusText);
  }
  const data = await response.json();
  return data.data;

}


export const addService = async (name, price, service_info, duration, bulstat) => {

  const business_bulstat = bulstat;
  const response = await fetch(`${BASE_URL}/services`, {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ name, price, service_info, duration, business_bulstat }),
    mode: 'cors'

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
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    console.error('Failed to fetch:', response.statusText);
  }
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

  if (!response.ok) {
    console.error('Failed to fetch:', response);
    return {
      "text": response.statusText,
      "code": response.status
    };

  }
  const data = await response.json();

  return data.data;

}


export const getEmployees = async (bulstat = null) => {

  let url = `${BASE_URL}/employees`;

  if (bulstat) {
    url += `?bulstat=${bulstat}`;
  }


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

export const addToOrder = (newData) => {

  let order = JSON.parse(sessionStorage.getItem('order')) || {};

  order = { ...order, ...newData };

  sessionStorage.setItem("order", JSON.stringify(order));

}

export const addAppointment = async (appointemnt) => {

  const response = await fetch(`${BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(appointemnt)
  });

  if (!response.ok) {
    return await response.json()
  }

  const data = await response.json();
  return data.data;

}

export const getAppointment = async () => {


  const response = await fetch(`${BASE_URL}/appointments`, {
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    console.error('Failed to fetch:', response.statusText);
  }
  const data = await response.json();

  return data.data;
}


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
  const data = await response.json();

  return data;
}


export const updateAppointment = async (id, appt) => {



  const response = await fetch(`${BASE_URL}/appointments/` + id, {
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

export const updateBusiness = async (id, business) => {

  const formData = new FormData();
  formData.append('email', business.email);
  formData.append('phone', business.phone);
  formData.append('address', business.address);
  formData.append('city', business.city);
  formData.append('_method', 'PUT');
  formData.append('business_info', business.business_info);
  formData.append('pos_payment', business.pos_payment ? 1 : 0);

  if (business.image) {
    formData.append('image', business.image);
  }

  if (business.working_hours) {
    formData.append('working_hours', business.working_hours);
  }


  const response = await fetch(`${BASE_URL}/businesses/` + id, {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + sessionStorage.getItem("token"),
      'Accept': 'application/json',
    },
    body: formData,
  });
  if (!response.ok) {
    return await response.json();
  }
  const data = await response.json();

  return data;
}

