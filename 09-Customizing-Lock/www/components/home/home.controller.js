(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService'];

  function HomeController($state, authService) {
    var vm = this;

    vm.login = login;
    vm.logout = authService.logout;

    function login() {
      $state.go("login");
    }

  }

}());
