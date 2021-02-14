import axios from "axios";

const api = axios.create({
  baseURL: "https://filmflix-backend.herokuapp.com/",
  headers: {
    "Access-Control-Allow-Origin": "*",

    "Content-Type": "application/json;charset=utf-8",
  },
  crossdomain: true,
});

export default api;
