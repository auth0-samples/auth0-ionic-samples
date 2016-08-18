(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$state', 'authService', 'store'];

    function HomeController($state, authService, store) {
        var vm = this;

        vm.auth = authService;

        vm.login = login;
        vm.logout = authService.logout;

        function login() {
            $state.go("login");
        }

        function logout() {
            authService.signout();
        }

    }

} ());