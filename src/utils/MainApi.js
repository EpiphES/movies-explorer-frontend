const BASE_URL = 'https://api.kinomania.nomoredomains.icu';
const headers = { 
  "Content-Type": "application/json", 
};


function checkResponse(res) {
  return res.ok ? res.json() : res.json().then((err)=> Promise.reject(err));
}

export function register({ name, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password })
  })
  .then((res) => checkResponse(res));
}

export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkResponse(res));
}

export function logout() {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    headers,
    credentials: "include",
  })
  .then((res) => checkResponse(res));
}

export function getCurrentUser() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers,
    credentials: 'include',
  })
    .then((res) => checkResponse(res));
}

export function updateUser({ name, email }) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    credentials: 'include',
    body: JSON.stringify({ name, email })
  })
    .then((res) => checkResponse(res));
}