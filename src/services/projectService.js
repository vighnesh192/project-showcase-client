export function getProjects(query) {
    return fetch('/projects/?sortBy='+query)
        .then(data => data.json());
}