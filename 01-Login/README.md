# Login

This example shows how to add ***Login/SignUp*** to your application using the `Lock` widget.

## Getting Started

To run this quickstart you can fork and clone this repo.

Be sure to set the correct values for your Auth0 application in the `www/app/auth0.variables.js` file.

To run the application

```bash
# Install the dependencies
bower install

# Get the plugins
ionic state restore --plugins

# Make sure inappbrowser is installed
ionic plugin add cordova-plugin-inappbrowser

# Run
ionic serve
```

## Important Snippets

### 1. Add the module dependencies and configure the service

```js
// /www/app/app.js

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
```

### 2. Implement the authService

The best way to coordinate the authentication related activities of your application is to create a reusable authentication service. This service is the place to register reusable methods for doing things like logging the user in, logging them out, and registering the listener that will be used by Lock to save the user's JWT and profile when authentication is successful.

```js
// www/app/auth/auth.service.js

angular
  .module('app')
  .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager'];

  function authService($rootScope, lock, authManager) {

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

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);
        });
      });
    }

    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
    }
  }
```

### 3. Implement the login controller

```js
// /www/app/account/login.controller.js

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
```

### 4. Add the login view

```html
<!-- /www/app/account/login.html -->

<ion-view view-title="Log In" ng-controller="LoginController as vm">
  <ion-content class="center">
    <div class="row">
      <div class="col"></div>
    <div>
  </ion-content>
</ion-view>
```
