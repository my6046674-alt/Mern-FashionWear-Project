import config from "@/config";
import axios from "axios";
import api from "./api";
import { formatParams } from "@/helpers/params";

export const getProducts = async (searchParams = {}) => {
  try {
    const query = formatParams({
      ...searchParams,
      limit: searchParams?.limit || 100,
    });

    const url = query
      ? `${config.apiUrl}/api/products?${query}`
      : `${config.apiUrl}/api/products`;

    const response = await axios.get(url, { timeout: 15000 });

    return Array.isArray(response.data)
      ? response.data
      : response.data?.products || response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch products:", error?.response?.data || error.message);
    return [];
  }
};

export const getProductById = async (id) => {
  if (!id) return null;

  try {
    const response = await axios.get(`${config.apiUrl}/api/products/${id}`, {
      timeout: 15000,
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error?.response?.data || error.message);
    return null;
  }
};

export const addProduct = async (data) => {
  return await api.post(`/api/products`, data);
};

export const updateProduct = async (id, data) => {
  return await api.put(`/api/products/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await api.delete(`/api/products/${id}`);
};

export const getCategories = async () => {
  const response = await axios.get(`${config.apiUrl}/api/products/categories`);

  return response.data;
};

export const getBrands = async () => {
  const response = await axios.get(`${config.apiUrl}/api/products/brands`);

  return response.data;
};

export const getTotalCount = async () => {
  const response = await axios.get(`${config.apiUrl}/api/products/count`);

  return response.data;
};
