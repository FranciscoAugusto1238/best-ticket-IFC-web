import axios from 'axios';

export const api = axios.create({
  //local
  //baseURL: "http://localhost:8080/",
  //servidor
  baseURL: "api-best-ticket-production.up.railway.app",
});

