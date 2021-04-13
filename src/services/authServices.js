export function checkLogin() {
    return fetch('/auth/checkLogin')
        .then(data => data.json());
}

export function logout() {
    return fetch('/auth/logout')
        .then(data => data.json());
}