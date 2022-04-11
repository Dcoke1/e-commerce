import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDM3YWExZDNiNjBlOTRlZGM5NWViZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTA2MjAzMiwiZXhwIjoxNjQ5MzIxMjMyfQ.F_QkXwWy72xmRIAfXTpukpMFidkpDPsjHv8XYwsvxQ0";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
