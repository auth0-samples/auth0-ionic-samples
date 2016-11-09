(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$ionicPlatform', 'authService'];

  function run($ionicPlatform, authService) {

    $ionicPlatform.ready(function () {
      if (window.t && window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      // Use the authManager from angular-jwt to check for
      // the user's authentication state when the page is
      // refreshed and maintain authentication
      authService.checkAuthOnRefresh();

      // Process the auth token if it exists and fetch the profile
      authService.authenticateAndGetProfile();

    });

  }

})();
