import axios from "axios";

export const productsIns = axios.create({
  baseURL: "https://vitalfit-production.up.railway.app/",
  //baseURL: "http://localhost:3001",
});
// https://vitalfitapi.onrender.com
