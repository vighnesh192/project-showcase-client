export function getTopCreators() {
    return fetch('users/?sortBy=popular')
        .then(data => data.json())
}

export function getUserProfile(id) {
    return fetch(`/users/${id}`)
        .then(data => data.json());
}