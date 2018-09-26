import { authHeader } from '../_helpers'
import { browserHistory } from 'react-router';

export const userService = {
  login,
  logout,
  getAll,
  verifyToken,
  verifyToken1
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username,password})
  };
  return fetch('http://localhost:4001/api/login', requestOptions)
          .then(response => response.json().then(data => ({
            data:data,
            status: response.status
          })
        ).then(res => {
          if (res.data.auth) {
            const user = res.data.user
            // login successful if there's a jwt token in the response
              if (user && res.data.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('user', JSON.stringify(user));
                  localStorage.setItem('token', JSON.stringify(res.data.token));
              }
              return user;
          }
          else {
            return Promise.reject(res.data.message)
          }

        })
      )
}


function logout(){
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch('http://localhost:4001/api/user', requestOptions)
          .then(resp => resp.json())
          .then(json => {
            if (!json.auth){
              if (json.err && json.err.message === 'jwt expired') {
                browserHistory.replace('/login');
                // location.href ='/login';
                browserHistory.push('/login')
              }
              return Promise.reject(json.message)
            }
            return json.users;
          })
}


function verifyToken() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch('http://localhost:4001/api/token', requestOptions)
          .then(resp => resp.json())
          .then(json => {
            console.log(json)
            if (!json.auth){
              console.log("Token not good");
              return Promise.reject(json.message);
            }
            console.log("Token good")
            return json.auth;
          })
}

function verifyToken1() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch('http://localhost:4001/api/token', requestOptions)
          .then(resp => resp.json())
          .then(json => {
            if (!json.auth){
              console.log("Token not good");
              this.props.history.push("/login");
            }
            console.log("Token good")
            return json.auth;
          })
}
