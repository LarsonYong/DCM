(function () {
    'use strict';

    angular
        .module('app')
        .controller('login.controller', Controller);

    function Controller($location, AuthenticationService) {
      console.log("lllllllllllll")
        var vm = this;
        vm.login = login;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
            console.log("Initing")
        };

        function login() {
            console.log('11112321312312')
            vm.loading = true;
            console.log(vm.username)
            // AuthenticationService.Login(vm.username, vm.password, function (result) {
            //     if (result === true) {
            //         $location.path('/');
            //     } else {
            //         vm.error = 'Username or password is incorrect';
            //         vm.loading = false;
            //     }
            // });
        };
    }

})();
