import axios from 'axios';

export const host = process.env.REACT_APP_SERVER_URL

const instance = axios.create({
    baseURL: host
})
const axiosPrivate = axios.create({
    baseURL: host,
    headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
    withCredentials: true
});
const axiosFile = axios.create({
    baseURL: host,
    headers: { 'Content-Type': 'multipart/form-data', "Access-Control-Allow-Origin": "*" },
    withCredentials: true
});

export { instance, axiosPrivate, axiosFile }