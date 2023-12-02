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

export const transferPlayback = async (deviceId: string) => {
  const body = { deviceId: deviceId };
  const response = await axios.put(`${baseUrl}/player`, body);
  return response;
};

export const getPlaylists = async () => {
  const response = await axios.get(`${baseUrl}/playlists`);
  return response;
};

export const getPlaylistById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/playlists/${id}`);
  return response;
};
