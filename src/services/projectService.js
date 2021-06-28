export function getProjects(query) {
    return fetch('/projects/?sortBy='+query, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(data => data.json());
}

export function getProjectsByUser(userId) {
    return fetch(`/users/${userId}/projects`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(data => data.json());
}

export function getUpvotedProjectsByUser(userId) {
    return fetch(`/users/${userId}/upvoted`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(data => data.json());
}

export function getProjectDetails(id) {
    return fetch(`/projects/${id}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(data => data.json());
}