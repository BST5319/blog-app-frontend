import axios from "axios";
const { REACT_APP_SITE } = process.env;

export default axios.create({
    baseURL: REACT_APP_SITE
});

export const axiosPrivate = axios.create({
    baseURL: REACT_APP_SITE,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});