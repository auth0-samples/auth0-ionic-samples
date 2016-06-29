(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$state', 'auth', 'store'];

    function HomeController($state, auth, store) {
        var vm = this;

        vm.auth = auth;
    }

} ());