export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    let token = JSON.parse(localStorage.getItem('token'));
    if (user && token) {
        return {
          'x-access-token': token,
          'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}
