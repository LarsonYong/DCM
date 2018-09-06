(function () {
  'use strict';

  angular
      .module('app')
      .factory('authHeader', Service);


  function Service() {
    let user = JSON.parse($localStorage.CurrentUser.username);
    let token = JSON.parse($localStorage.CurrentUser.token);
    if (user && token) {
        return {
          'x-access-token': token,
          'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
  }
})();
