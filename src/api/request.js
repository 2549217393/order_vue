import axios from 'axios';

export const service = axios.create({
  baseURL: "http://localhost:8082", // api的base_url
  timeout: 5000,
  withCredentials:true,
  method:"post",
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

export default service;
