(function () {
    'use strict';
    angular
        .module('app')
        .controller('result.controller', Controller);

    function Controller($http, $localStorage, $stateParams, $location, $scope) {
        var vm = this;
        // $scope.result = {}
        // $scope.result.disk_usage = [[0,0], [0,0]]
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
          $scope.unitID = ID
          var url = 'http://0.0.0.0:4001/api/result/id/' + ID
          console.log(url)
          $http.get(url, {headers:headers})
              .success(function(response) {
                var result = JSON.parse(response.result)
                $scope.result = result
                console.log(result)
                if ($scope.result.disk_usage[1][0] > 20){
                  $scope.result.disk_usage[1][0] = $scope.result.disk_usage[1][0] * 0.001
                }
                if ($scope.result.disk_usage[1][1] > 20){
                  $scope.result.disk_usage[1][1] = $scope.result.disk_usage[1][1] * 0.001
                }
                console.log($scope.result.disk_usage)
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
                      '# of GB   Avail SSD Volume'
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
                      '# of GB  Free FileSystem Space'
                  ],
                }
                var video_size1 = []
                var video_size2 = []
                for (var i in $scope.result.video_size[0]){
                  video_size1.push(i);
                  video_size2.push($scope.result.video_size[0][i])
                }

                data = $scope.result.video_size2
                for (var i=0; i<video_size2.length; i++) {
                  console.log()
                  if (video_size2[i].substr(video_size2[i].length -1) === 'M'){
                    video_size2[i] = parseFloat(video_size2[i]) * 0.001
                  }
                  video_size2[i] = parseFloat(video_size2[i])
                }

                // Process Chart 2
                var video_size3 = []
                var video_size4 = []
                for (var i in $scope.result.video_size[1]){
                  video_size3.push(i);
                  video_size4.push($scope.result.video_size[1][i])
                }
                data = $scope.result.video_size3
                for (var i=0; i<video_size4.length; i++) {
                  if (video_size4[i].substr(video_size4[i].length -1) === 'M'){
                    video_size4[i] = parseFloat(video_size4[i]) * 0.001
                  }
                  video_size4[i] = parseFloat(video_size4[i])
                }
                var data2 ={
                  labels: video_size1,
                  datasets: [{
                      data: video_size2,
                      label:'# of GB  Low Def Video Size',
                      backgroundColor: [
                            'rgb(54, 162, 235)'
                      ],
                      borderColor: [

                          'rgb(54, 162, 235)'
                      ],
                      borderWidth: 1
                  }]

                }
                var options2 = {
                  scales: {
                        xAxes: [{
                            stacked: false
                        }],
                       yAxes: [{
                           ticks: {
                             suggestedMin: 0,
                             suggestedMax: 10

                           },
                           stacked: false
                       }]
                   }
                }
                var data3 ={
                  labels: video_size3,
                  datasets: [{
                      data: video_size4,
                      label:'# of GB  High Def Video Size ',
                      backgroundColor: [
                        'rgb(255, 205, 86)'
                      ],
                      borderColor: [

                          'rgb(255, 205, 86)'
                      ],
                      borderWidth: 1
                  }]

                }
                var options3 = {
                  scales: {
                        xAxes: [{
                            stacked: false
                        }],
                       yAxes: [{
                           ticks: {
                             suggestedMin: 0,
                             suggestedMax: 20

                           },
                           stacked: false
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
                    options: options2
                });
                var ctx = document.getElementById("myChart4")
                var myBarChart = new Chart(ctx, {
                    type: 'line',
                    data: data3,
                    options: options3
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
