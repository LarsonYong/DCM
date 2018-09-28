import { authHeader } from '../_helpers'
import { browserHistory } from 'react-router';

export const nodeService = {
  getAll,
  getNode,
  updateNode
};

function getAll() {
  const headers = authHeader()
  const requestOptions = {
    method: 'GET',
    headers: headers
  };
  return fetch('http://localhost:4001/api/node', requestOptions)
          .then(resp => resp.json())
          .then(json => {
            if (!json.auth){
              if (json.err && json.err.message === 'jwt expired') {
                browserHistory.replace('/login');
              }
              return Promise.reject(json.message)
            }
            return json.nodes;
          })
}

function getNode(data) {
  const headers = authHeader()
  const requestOptions = {
    method: 'GET',
    headers: headers
  };
  const url = 'http://localhost:4001/api/node/id/' + data
  return fetch(url, requestOptions)
          .then(resp => resp.json())
          .then(json => {
            if (!json.auth){
              if (json.err && json.err.message === 'jwt expired') {
                browserHistory.replace('/login');
              }
              return Promise.reject(json.message)
            }
            return json;
          })
}

function updateNode(ID,body) {
  const headers = authHeader()
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };
  const url = 'http://localhost:4001/api/node/id/' + ID

  return fetch(url, requestOptions)
          .then(resp => resp.json())
          .then(json => {
            if (!json.auth){
              if (json.err && json.err.message === 'jwt expired') {
                browserHistory.replace('/login');
              }
              return Promise.reject(json.message)
            }
            return json;
          })
}
