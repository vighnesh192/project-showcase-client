export function getProjects(query) {
    return fetch('/projects/?sortBy='+query)
        .then(data => data.json());
}

export function getProjectsByUser(userId) {
    return fetch(`/users/${userId}/projects`)
        .then(data => data.json());
}

export function getUpvotedProjectsByUser(userId) {
    return fetch(`/users/${userId}/upvoted`)
        .then(data => data.json());
}

export function getProjectDetails(id) {
    return fetch(`/projects/${id}`)
        .then(data => data.json());
}