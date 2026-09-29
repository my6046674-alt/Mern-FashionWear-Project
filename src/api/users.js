import api from "./api";

export const getAllUsers = async () => {
  try {
    return await api.get(`/api/users`);
  } catch (error) {
    if (error?.response?.status === 404) {
      return await api.get(`/api/admin/users`);
    }
    throw error;
  }
};

export const getUsersById = async (id) => {
  if (!id) return { data: null };

  try {
    return await api.get(`/api/users/${id}`);
  } catch (error) {
    if (error?.response?.status === 404) {
      return await api.get(`/api/admin/users/${id}`);
    }
    throw error;
  }
};

export const updateUserRoles = async (id, roles) => {
  if (!id) return null;

  try {
    return await api.put(`/api/users/${id}/roles`, { roles });
  } catch (error) {
    if (error?.response?.status === 404) {
      return await api.put(`/api/admin/users/${id}/roles`, { roles });
    }
    throw error;
  }
};
