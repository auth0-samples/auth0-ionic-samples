# Login

This example shows how to add ***Login/SignUp*** to your application using the `Lock` widget.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/01-login). 

## Getting Started

To run this quickstart you can fork and clone this repo.

Be sure to set the correct values for your Auth0 application in the `www/app/auth0.variables.js` file.

To run the application

```bash
# Install the dependencies
bower install

# Run
ionic serve
```

## Important Snippets

### 1. Add the module dependencies and configure the service

```js
// /www/app/app.js

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

// This hooks all auth events to check everything as soon as the app starts
auth.hookEvents();

})

.config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {

$stateProvider
    .state('home', {
    url: '/',
    templateUrl: 'app/home/home.html'
    });

// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/');

// Initialized the Auth0 provider
authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginState: 'login'
});

});
```

### 2. Implement the login controller

```js
// /www/app/account/login.controller.js

(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$scope', '$state', 'auth', 'store'];

  function LoginController($scope, $state, auth, store) {
    var vm = this;

    function doLogin() {
      auth.signin({
        container: 'lock-container',
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function (profile, token, accessToken, state, refreshToken) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        store.set('accessToken', accessToken);
        store.set('refreshToken', refreshToken);
        
         $state.go("home");
      }, function () {
        // Error callback
      });
    }

    doLogin();
  }
  
} ());
```

### 3. Add the login view

```html
<!-- /www/app/account/login.html -->

<ion-view view-title="Log In" ng-controller="LoginController as vm">
  <ion-content class="center">
    <div class="row">
      <div class="col">
          <div id="lock-container"></div>
      </div>
    <div>
  </ion-content>
</ion-view>
```