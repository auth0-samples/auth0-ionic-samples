(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['store', '$scope', '$state', 'auth'];

  function LoginController(store, $scope, $state, auth) {
    var vm = this;

    vm.login = login;
    
    function login() {
      auth.signin({
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function (profile, token, accessToken, state, refreshToken) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        store.set('refreshToken', refreshToken);
        
         $state.go("home");
      }, function () {
        // Error callback
      });
    }

  }
  
} ());