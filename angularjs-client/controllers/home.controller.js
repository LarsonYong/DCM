(function () {
    'use strict';

    angular
        .module('app')
        .controller('home.controller', Controller);

    function Controller($http,$localStorage, $location, $scope) {
        var vm = this;

        initController();

        function initController() {
          var headers = auth()
          getUser();
          $http.get('http://0.0.0.0:4001/api/node',{headers:headers})
              .success(function(response) {
                console.log(response)
                var nodes = response.nodes
                console.log(nodes)
                $scope.nodes = nodes
              })
              .error(function(response){
                console.log(response.message)
                if (response.auth === false){
                  $location.path('/login');
                }else {
                  return response.message
                }
              })
        }

        function auth(){
          let user = $localStorage.currentUser.username;
          let token = $localStorage.currentUser.token;
          if (user && token) {
              return {
                'x-access-token': token,
                'Content-Type': 'application/json'
              };
          } else {
              return {};
          }
        }

        function getUser(){
          console.log($localStorage.currentUser.username)
          if ($localStorage.currentUser) {
              var username = $localStorage.currentUser.username
              $scope.username=username;
          }

        }
    }

})();
