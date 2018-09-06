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
                    $location.path('/');
                }
                if (result !== true){
                    vm.error = result.message;
                    vm.loading = false;
                }
            });
        };
    }

})();
