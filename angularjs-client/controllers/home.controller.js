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
                var nodes = response.nodes
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

        $scope.selectNode=function($event){
          var targetCard= $event.target.closest('div').parentNode.parentNode;
          var cardImg = targetCard.children[0].children[0]
          if (targetCard.classList[1] == 'col-sm-4' || targetCard.classList[0] == 'col-sm-4'){
            setTimeout(function () {
              targetCard.classList.remove('col-sm-4');setTimeout(function () {
                targetCard.classList.add('col-sm-12');
              },10)
            },10)

          }
          if (targetCard.classList[1] == 'col-sm-12' || targetCard.classList[0] == 'col-sm-12') {
            setTimeout(function() {
              targetCard.classList.remove('col-sm-12');
              setTimeout(function () {
                targetCard.classList.add('col-sm-4');
              },10)
            },10)

          }
          if (cardImg.classList[0] !== 'clip' && cardImg.classList[1] !== 'clip' ) {
            cardImg.classList.add('clip');
          }else {
            cardImg.classList.remove('clip')
          }


          // $event.target.closest('div').parentNode.parentElement.classList.add('row').remove('card-colums')
        }

        function selectNode($event){
          console.log($event.target)
        }

        $scope.createImgNum= function (){
          var num= Math.floor(Math.random()*10) +1;
          var img= '0' + num +'.jpg'
          return img
        }
    }

})();
