import axios from "axios";

export function checkLogin() {
    return axios.get('/auth/checkLogin')
        .then(data => data.data);
}

export function logout() {
    return axios.get('/auth/logout')
        .then(data => data.data);
}