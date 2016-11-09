(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['authService'];

  function LoginController(authService) {
    var vm = this;

    vm.login = login;
    vm.signup = signup;
    vm.loginWithGoogle = authService.loginWithGoogle;    

    // Log in with username and password
    function login() {
      authService.login(vm.username, vm.password);
    }

    function signup() {
      authService.signup(vm.username, vm.password);
    }

  }

})();
