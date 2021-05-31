export function getProjects(query) {
    return fetch('/projects/?sortBy='+query)
        .then(data => data.json());
}

export function getProjectDetails(id) {
    return fetch(`/projects/${id}`)
        .then(data => data.json());
}