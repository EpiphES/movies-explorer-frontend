const BASE__URL = 'https://api.kinomania.nomoredomains.icu';
const headers = { 
  "Content-Type": "application/json", 
};


function checkResponse(res) {
  return res.ok ? res.json() : res.json().then((err)=> Promise.reject(err));
}

export function register({ name, email, password }) {
  return fetch(`${BASE__URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password })
  })
  .then((res) => checkResponse(res));
}

export function login({ email, password }) {
  return fetch(`${BASE__URL}/signin`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkResponse(res));
}

export function logout() {
  return fetch(`${BASE__URL}/signout`, {
    method: "GET",
    headers,
    credentials: "include",
  })
  .then((res) => checkResponse(res));
}