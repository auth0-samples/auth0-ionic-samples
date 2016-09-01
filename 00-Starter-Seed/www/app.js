// Ionic Starter App
(function () {

  'use strict';

  angular
    .module('app', ['ionic', 'auth0.lock', 'angular-jwt'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', 'lockProvider'];

  function config($stateProvider, $urlRouterProvider, lockProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN
    });
  }

})();
