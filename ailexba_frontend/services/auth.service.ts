import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/Auth/login`, {
        email: email,
        password: password
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Lỗi kết nối đến server!');
      }
      throw new Error('Đã có lỗi xảy ra!');
    }
  },

  register: async (fullName: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/Auth/register`, {
        fullName: fullName, 
        email: email,
        password: password
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Lỗi kết nối đến server!');
      }
      throw new Error('Đã có lỗi xảy ra!');
    }
  }
};