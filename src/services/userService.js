import axios from "axios";

export function getTopCreators() {
    return axios.get('users/?sortBy=popular')
        .then(data => data.data)
}

export function getUserProfile(id) {
    return axios.get(`/users/${id}`)
        .then(data => data.data);
}