import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getAccessToken = async () => {
  const response = await axios.get(`${baseUrl}/auth/token`);
  return response;
};

export const logoutUser = async () => {
  const response = await axios.get(`${baseUrl}/auth/logout`);
  return response;
};

export const getUserDetails = async () => {
  const response = await axios.get(`${baseUrl}/user`);
  return response;
};
