import axios from "axios";



const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"           // development URL
    : "https://backend-b7x0.onrender.com"; // production URL

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
