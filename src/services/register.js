import api from "./api";

export const register=async (data) => {
  const response = await api.post("/register", data);
  return response.data;
}

export const paymentCallback = async (data) => {
  const response = await api.post("/payment/callback", data);
  return response.data;
}

export const getPaymentStatus = async (reference) => {
  const response = await api.get(`/payment/status/${reference}`);
  return response.data;
}