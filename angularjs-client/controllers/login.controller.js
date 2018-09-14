(function () {
    'use strict';

    angular
        .module('app')
        .controller('login.controller', Controller);

    function Controller($location, AuthenticationService) {
        var vm = this;
        vm.login = login;
        vm.loading = false;
        initController();
        console.log(vm.loading)
        function initController() {
            // reset login status
            AuthenticationService.Logout();
            console.log("Initing")
        };

        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    var bkg = document.querySelectorAll(".bkg");
                    bkg[0].classList.add('ease-out')
                    wait(100)
                    $location.path('/');
                }
                if (result !== true){
                    vm.error = result;
                    vm.loading = false;
                }
            });
        };

        function wait(ms){
         var start = new Date().getTime();
         var end = start;
         while(end < start + ms) {
           end = new Date().getTime();
        }
      }
    }

})();
