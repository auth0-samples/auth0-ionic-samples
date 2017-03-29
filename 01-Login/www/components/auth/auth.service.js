(function() {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager', 'jwtHelper'];

  function authService($rootScope, lock, authManager, jwtHelper) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
        lock.hide();

        // Redirect to default page
        location.hash = '#/';

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }
          localStorage.setItem('profile', JSON.stringify(profile));
        });
      });

      lock.on('authorization_error', function(error) {
        console.log(error);
      });
    }

    function checkAuthOnRefresh() {
      var token = localStorage.getItem('id_token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!$rootScope.isAuthenticated) {
            authManager.authenticate();
          }
        }
      }
    }

    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
      checkAuthOnRefresh: checkAuthOnRefresh
    }
  }
})();
