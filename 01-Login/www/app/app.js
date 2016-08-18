// Ionic Starter App

angular.module('app', ['ionic', 'angular-storage', 'angular-jwt', 'auth0.lock'])

  .run(function ($ionicPlatform, $rootScope, authManager, authService, store, jwtHelper, $location) {

      
    $ionicPlatform.ready(function () {

      // Register the authentication listener that is
      // set up in auth.service.js
      authService.registerAuthenticationListener();

      // Check for a valid JWT when the user
      // closes and opens the app
      authManager.checkAuthOnRefresh();
      

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

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider, lockProvider) {

    $stateProvider

      // setup an abstract state for the tabs directive
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html'
      })

      .state('login', { // Notice: this state name matches the loginState property value to set in authProvider.init({...}) below...
        url: '/login',
        templateUrl: 'app/account/login.html'
      });

    lockProvider.init({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      options: {
        auth: {
          redirect: false,
          params: {
            scope: 'openid offline_access',
            device: 'Mobile device'
          }
        }
      }
    });

    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  });