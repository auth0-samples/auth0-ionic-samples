(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$ionicPlatform', '$rootScope', 'authService'];

  function run($ionicPlatform, $rootScope, authService) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      // Register the authentication listener that is
      // set up in auth.service.js
      authService.registerAuthenticationListener();

      //This event gets triggered on URL change
      $rootScope.$on('$locationChangeStart', authService.checkAuthOnRefresh);

    });

    // Check is the user authenticated before Ionic platform is ready
    authService.checkAuthOnRefresh();
  }

})();
