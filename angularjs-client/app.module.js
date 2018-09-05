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
}]).run(['$rootScope', '$location', '$cookies', '$http', function($rootScope, $location, $cookies, $http){
  $rootScope.globals = $cookies.getObject('globals') || {};
  if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login') === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
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
