import axios from "axios";

axios.defaults.baseURL = 'https://fit-tribe-api-97fb1c20a2ee.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
