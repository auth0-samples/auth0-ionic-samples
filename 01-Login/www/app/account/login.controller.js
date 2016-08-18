(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$scope', '$state', 'authService', 'store'];

  function LoginController($scope, $state, authService, store) {
    var vm = this;

    function doLogin() {
      authService.login();
    }

    doLogin();
  }
  
} ());