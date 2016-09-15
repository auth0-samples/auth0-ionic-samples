(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'angularAuth0', 'authManager', 'jwtHelper', '$location', '$ionicPopup'];

  function authService($rootScope, angularAuth0, authManager, jwtHelper, $location, $ionicPopup) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login(username, password) {
      angularAuth0.login({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password
      }, onAuthenticated, null);
    }

    function signup(username, password, callback) {
      angularAuth0.signup({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password
      }, callback);
    }

    function loginWithGoogle() {
      angularAuth0.login({
        connection: 'google-oauth2',
        responseType: 'token',
        popup: true
      }, onAuthenticated, null);
    }


    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    function authenticateAndGetProfile() {
      var result = angularAuth0.parseHash(window.location.hash);

      if (result && result.idToken) {
        onAuthenticated(null, result);
      } else if (result && result.error) {
        onAuthenticated(result.error);
      }
    }

    function onAuthenticated(error, authResult) {
      if (error) {
        return $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      }

      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();

      angularAuth0.getProfile(authResult.idToken, function (error, profileData) {
        if (error) {
          return console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profileData));
        userProfile = profileData;

        $location.path('/');
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
      login: login,
      logout: logout,
      signup: signup,
      loginWithGoogle: loginWithGoogle,
      checkAuthOnRefresh: checkAuthOnRefresh,
      authenticateAndGetProfile: authenticateAndGetProfile
    }
  }
})();
