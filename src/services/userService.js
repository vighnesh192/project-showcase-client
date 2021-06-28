export function getTopCreators() {
    return fetch('users/?sortBy=popular', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(data => data.json())
}

export function getUserProfile(id) {
    return fetch(`/users/${id}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(data => data.json());
}