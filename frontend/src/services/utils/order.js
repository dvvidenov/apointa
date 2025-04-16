
export const addToOrder = (newData) => {

  let order = JSON.parse(sessionStorage.getItem('order')) || {};

  order = { ...order, ...newData };

  sessionStorage.setItem("order", JSON.stringify(order));

}
