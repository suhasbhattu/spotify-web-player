import axios from "axios";

const baseUrl = "http://localhost:5000";

export const getAccessToken = async () => {
  const response = await axios.get(`${baseUrl}/auth/token`);
  return response;
};
