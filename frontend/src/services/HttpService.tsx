import axios from "axios";

const external_IP = process.env.BACKEND_API;

export const httpClient = axios.create({
  baseURL: external_IP,
  headers: {
    "Content-type": "application/json"
  }
});


