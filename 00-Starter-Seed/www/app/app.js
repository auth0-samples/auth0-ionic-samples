// Ionic Starter App

angular.module('app', ['ionic', 'auth0', 'angular-storage', 'angular-jwt'])

  .run(function ($ionicPlatform, $rootScope, auth, store, jwtHelper, $location) {
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
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  });