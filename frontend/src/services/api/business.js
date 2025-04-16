import { BASE_URL } from './config';

export const getBusinesses = async () => {
  const response = await fetch(`${BASE_URL}/businesses`);
  if (!response.ok) throw new Error('Failed to fetch');


  const data = await response.json();
  return data.data;

}

export const getSpecificBusinesses = async (name) => {
  const response = await fetch(`${BASE_URL}/businesses/${name}`);
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  return data.data;

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

