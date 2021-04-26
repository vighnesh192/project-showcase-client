export function getTopCreators() {
    return fetch('users/?sortBy=popular')
        .then(data => data.json())
}