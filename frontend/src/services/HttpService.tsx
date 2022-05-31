import axios from "axios";

const external_IP = process.env.REACT_APP_BACKEND_API;
console.log("EXTERNAL_IP IS: ", external_IP);

export const httpClient = axios.create({
  baseURL: external_IP,
  headers: {
    "Content-type": "application/json"
  }
});


