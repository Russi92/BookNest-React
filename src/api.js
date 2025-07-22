
import axios from "axios";

const API = axios.create({
  baseURL: "https://dev.gfoura.com/api",
});

export const getProperties = () => API.get("/properties")