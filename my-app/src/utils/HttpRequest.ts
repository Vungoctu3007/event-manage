import axios, { type AxiosInstance } from "axios";
const baseURL: string = "http://localhost/api";
const httpRequest: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default httpRequest;