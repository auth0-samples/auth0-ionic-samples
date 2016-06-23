(function(){
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$rootScope', '$state', 'auth'];

    function HomeController($rootScope, $state, auth){
        var vm = this;
        
        vm.$rootScope = $rootScope;
        vm.auth = auth;

        vm.login = login;
        vm.logout = logout;

        function login() {
          $state.go("login");
        }

        function logout() {
          auth.signout();
        }

    }

}());