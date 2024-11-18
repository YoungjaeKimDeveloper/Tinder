import axios from "axios";

// TODO UPDATE THE BASE URL HERE SO THAT IT WORKS IN THE DEPLOYMENT AS WELL
// LOCALHOST ONLY WORKS IN MY COMPUTER

// Set the prefix address
export const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true,
});
