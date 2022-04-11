import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_TOKEN;

export const publicRequest = axios.create({
  baseURL: url,
});

export const userRequest = axios.create({
  baseURL: url,
  header: { token: `Bearer ${token}` },
});
