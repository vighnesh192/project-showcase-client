import axios from "axios";

export function getTopCreators() {
    return axios.get('users/?sortBy=popular')
        .then(data => data.data)
}

export function getUserProfile(id) {
    return axios.get(`/users/${id}`)
        .then(data => data.data);
}

export function followUnfollow(userId) {
    return axios.post(`/users/${userId}/follow`)
        .then(data => data.data)
        .catch(err => err);
}

export function getFollowedData(userId) {
    return axios.get(`/users/${userId}/follow`)
        .then(data => data.data)
        .catch(err => err)
}