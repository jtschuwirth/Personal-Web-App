import axios from "axios";

const api = axios.create({
  //Production
  //Dev
  baseURL: "https://59fxcxkow4.execute-api.us-east-1.amazonaws.com/dev/dfk/",

});

export default api;