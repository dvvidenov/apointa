import { BASE_URL } from './config';

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    console.error('Failed to fetch:', response.statusText);
  }
  const data = await response.json();
  return data.data;

}
