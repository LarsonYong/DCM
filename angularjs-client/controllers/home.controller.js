(function () {
    'use strict';

    angular
        .module('app')
        .controller('home.controller', Controller);

    function Controller($http,$localStorage, $location,blockUI, $scope, $state, $route, $timeout) {
        var vm = this;
        var headers = auth()
        initController();

        function initController() {
          var headers = auth()
          // var blockUI = blockUI.instances.get('blockUI');
          getUser();
          $http.get('http://127.0.0.1:4001/api/node',{headers:headers})
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

            $http.get('http://0.0.0.0:4001/api/status',{headers:headers})
                .success(function(response) {
                  var stauts = response.status
                  $scope.status = status
                  for (var i in response.status){
                    // console.log(response.status[i])
                    for (var j in $scope.nodes){
                      if ($scope.nodes[j].UnitID == response.status[i].UnitID){
                        $scope.nodes[j].UnitLastOnline = response.status[i].UnitLastOnline
                        $scope.nodes[j].UnitOccupied = response.status[i].UnitOccupied
                        $scope.nodes[j].UnitOnline = response.status[i].UnitOnline
                      }
                    }

                  }
                  return $scope.status
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

        function bindData(){
          console.log($scope)
          for (var i in $scope.status){
            console.log(i)
          }
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

        $scope.NvgResult= function(UnitID){
          var url = '/result/:id' + UnitID
          $location.path(url);
        }

        $scope.Refresh= function(){
          console.log("Refreshing")
          $http.get('http://0.0.0.0:4001/api/status/refresh',{headers:headers})
              .success(function(response) {
                console.log('Finished refresh')
              })
          blockUI.start("Start to check");
          $timeout(function() {
            blockUI.message("Almost there")
          }, 4000);
          $timeout(function() {
            blockUI.message("Cleaning up")
          }, 5500);
          $timeout(function() {
            blockUI.stop();

          }, 6000);
          $timeout(function() {

            $http.get('http://0.0.0.0:4001/api/status',{headers:headers})
                .success(function(response) {
                  var stauts = response.status
                  $scope.status = status
                  for (var i in response.status){

                    for (var j in $scope.nodes){
                      if ($scope.nodes[j].UnitID == response.status[i].UnitID){
                        $scope.nodes[j].UnitLastOnline = response.status[i].UnitLastOnline
                        $scope.nodes[j].UnitOccupied = response.status[i].UnitOccupied
                        $scope.nodes[j].UnitOnline = response.status[i].UnitOnline
                      }
                    }
                  }
                  return $scope.status
                })
                .error(function(response){

                  if (response.auth === false){
                    $location.path('/login');
                  }else {
                    return response.message
                  }
                })

          }, 6500);
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
