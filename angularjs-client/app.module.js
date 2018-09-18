(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage','ngAnimate', 'blockUI', 'ngRoute'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('result', {
                url:'/result/:id',
                templateUrl: 'views/result/result.html',
                controller: 'result.controller',
                controllerAs: 'vm',
            })
            .state('home', {
                url: '/',
                templateUrl: 'views/home/home.html',
                controller: 'home.controller',
                controllerAs: 'vm',
                data: {
                  css: 'views/home/home.css'
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login/login.html',
                controller: 'login.controller',
                controllerAs: 'vm'
            });
    }

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();
