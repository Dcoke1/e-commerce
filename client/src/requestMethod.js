import axios from "axios";

const production  = 'https://jeremiahs.herokuapp.com/api';
const development = 'http://localhost:4000/api';

export const url = process.env.NODE_ENV === 'development' ? development : production;
const token = process.env.REACT_APP_TOKEN;

export const publicRequest = axios.create({
  baseURL: url,
});

export const userRequest = axios.create({
  baseURL: url,
  header: { token: `Bearer ${token}` },
});
