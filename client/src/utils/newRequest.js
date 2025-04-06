import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:8800/api/",
  baseURL:"https://revive-matrix-infinity.vercel.app/api",
  withCredentials: true,
});

export default newRequest;
