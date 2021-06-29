import axios from "axios";

export function getProjects(query) {
    return axios.get('/projects/?sortBy='+query)
        .then(data => data.data);
}

export function getProjectsByUser(userId) {
    return axios.get(`/users/${userId}/projects`)
        .then(data => data.data);
}

export function getUpvotedProjectsByUser(userId) {
    return axios.get(`/users/${userId}/upvoted`)
        .then(data => data.data);
}

export function getProjectDetails(id) {
    return axios.get(`/projects/${id}`)
        .then(data => data.data);
}