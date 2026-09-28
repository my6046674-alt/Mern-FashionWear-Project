// import api from "./api";

// export const getAllOrders = async () => {
//   return await api.get(`/api/orders`);
// };

// export const getOrdersById = async (id) => {
//   return await api.get(`/api/orders/${id}`);
// };

// export const getOrdersByUser = async (status) => {
//   return await api.get(`/api/orders/user?status=${status}`);
// };

// export const getOrdersByMerchant = async () => {
//   return await api.get(`/api/orders/merchant`);
// };

// export const createOrder = async (data) => {
//   return await api.post(`/api/orders`, data);
// };

// export const cancelOrder = async (id) => {
//   return await api.patch(`/api/orders/${id}/cancel`);
// };

// export const payViaKhalti = async (id) => {
//   return await api.put(`/api/orders/${id}/payment/khalti`);
// };

// export const payViaStripe = async (id) => {
//   return await api.put(`/api/orders/${id}/payment/stripe`);
// };

// export const payViaCash = async (id) => {
//   return await api.put(`/api/orders/${id}/payment/cash`);
// };

// export const confirmOrder = async (id, status) => {
//   return await api.put(`/api/orders/${id}/confirm`, { status: status });
// };

// export const updateOrderStatus = async (id, status) => {
//   return await api.put(`/api/orders/${id}/status`, { status: status });
// };
// =================================================

import api from "./api";

export const getAllOrders = async () => {
  return await api.get(`/api/orders`);
};

export const getOrdersById = async (id) => {
  return await api.get(`/api/orders/${id}`);
};

export const getOrdersByUser = async (status) => {
  return await api.get("/api/orders/user", {
    params: status == null ? undefined : { status },
  });
};

export const getOrdersByMerchant = async () => {
  return await api.get(`/api/orders/merchant`);
};

export const createOrder = async (data) => {
  return await api.post(`/api/orders`, data);
};

export const cancelOrder = async (id) => {
  return await api.patch(`/api/orders/${id}/cancel`);
};

export const payViaKhalti = async (id) => {
  return await api.put(`/api/orders/${id}/payment/khalti`);
};

export const payViaStripe = async (id) => {
  return await api.put(`/api/orders/${id}/payment/stripe`);
};

export const payViaCash = async (id) => {
  return await api.put(`/api/orders/${id}/payment/cash`);
};

export const confirmOrder = async (id, status) => {
  return await api.put(`/api/orders/${id}/confirm`, {
    status: status,
  });
};

export const updateOrderStatus = async (id, status) => {
  return await api.put(`/api/orders/${id}/status`, {
    status: status,
  });
};

