import axios from "axios";

const baseURL = import.meta.env.VITE_BASEURL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
