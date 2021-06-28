export function checkLogin() {
    return fetch('/auth/checkLogin', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(data => data.json());
}

export function logout() {
    return fetch('/auth/logout', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(data => data.json());
}