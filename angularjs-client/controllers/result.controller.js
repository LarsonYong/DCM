(function () {
    'use strict';
    angular
        .module('app')
        .controller('result.controller', Controller);

    function Controller($http, $localStorage, $stateParams, $location, $scope) {
        var vm = this;
        $scope.result = {}
        $scope.result.disk_usage = [[0,0], [0,0]]
        initController();

        function initController() {
            getUser();
            var id = $stateParams.id;
            getStatus(id);


        };

        function getUser(){
          console.log($localStorage.currentUser.username)
          if ($localStorage.currentUser) {
              var username = $localStorage.currentUser.username
              $scope.username=username;
          }
        }

        function getStatus(UnitID){
          var headers = auth()
          console.log(UnitID)
          var ID = UnitID.substring(3, 8)

          var url = 'http://0.0.0.0:4001/api/result/id/' + ID
          console.log(url)
          $http.get(url, {headers:headers})
              .success(function(response) {
                var result = JSON.parse(response.result)
                $scope.result = result
                console.log(result)
                var data = {
                  datasets: [{
                      data: [$scope.result.disk_usage[0][0],$scope.result.disk_usage[0][1]],
                      backgroundColor: [
                          'rgb(75, 192, 192)',
                          'rgb(54, 162, 235)'
                      ],
                      borderColor: [
                          'rgb(75, 192, 192)',
                          'rgb(54, 162, 235)'

                      ],
                      borderWidth: 1
                  }],

                  // These labels appear in the legend and in the tooltips when hovering different arcs
                  labels: [
                      'G of Avail SSD Volume'
                  ],

                }
                var ctx = document.getElementById("myChart");
                var myChart = new Chart(ctx, {
                  type: 'pie',
                  data: data,
                  // options: options
                });


                var data1 = {
                  datasets: [{
                      data: [$scope.result.disk_usage[1][0],$scope.result.disk_usage[1][1]],
                      backgroundColor: [

                          'rgb(255, 205, 86)',
                          'rgb(255, 159, 64)'
                      ],
                      borderColor: [

                          'rgb(255, 205, 86)',
                          'rgb(75, 192, 192)'
                      ],
                      borderWidth: 1
                  }],

                  // These labels appear in the legend and in the tooltips when hovering different arcs
                  labels: [
                      'G of Free FileSystem Space'
                  ],

                }
                console.log($scope.result.video_size1)
                var data2 ={
                  datasets: [{
                      data: [$scope.result.video_size2],
                      backgroundColor: [

                          'rgb(255, 205, 86)',
                          'rgb(255, 159, 64)'
                      ],
                      borderColor: [

                          'rgb(255, 205, 86)',
                          'rgb(75, 192, 192)'
                      ],
                      borderWidth: 1
                  }],

                  // These labels appear in the legend and in the tooltips when hovering different arcs
                  labels: [
                      $scope.result.video_size1
                  ],
                }

                var options = {
                  scales: {
                       yAxes: [{
                           ticks: {
                               suggestedMin: 0,
                               suggestedMax: 10
                           }
                       }]
                   }
                }

                var ctx = document.getElementById("myChart2");
                var myChart = new Chart(ctx, {
                  type: 'pie',
                  data: data1,
                  // options: options
                });
                var ctx = document.getElementById("myChart3")
                var myBarChart = new Chart(ctx, {
                    type: 'line',
                    data: data2,
                    options: options
                });


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

      }
})();
