'use strict'

// Declare modules
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('myApp', [
  'ngRoute',
  'Authentication',
  'Home',
  'routeStyles'
]).config(['$locationProvider','$routeProvider',function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider
    .when('/login', {
      controller: 'LoginController',
      templateUrl: './views/login.html',
    })
    .when('/home', {
      controller: 'HomeController',
      templateUrl: './views/home.html'
    })
    .otherwise({redirectTo:'/'})
}])

var app = angular.module("myApp");
app.controller('navController', ['$scope', '$location', function ($scope, $location) {
    $scope.items = [
        {path: '/home', title: 'home'},
        {path: '/login', title: 'login'}
    ];
    $scope.isActive = function (item) {
        return item.path === $location.path();
    };
}]);
