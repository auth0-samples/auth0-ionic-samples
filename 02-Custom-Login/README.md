# Login

This example shows how to add ***Login/SignUp*** to your application using a custom Login screen.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/02-custom-login). 

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

### 1. Refernce the auth0.js library

```html
<!-- /www/index.html -->

<script src="lib/auth0.js/build/auth0.js"></script>
```

### 2. Create the Login View

```html
<!-- /www/app/account/login.html -->

<ion-view view-title="Log In" ng-controller="LoginController as vm">
  <ion-content class="padding">
      <div class="list list-inset">
          <label class="item item-input">
              <input type="text" placeholder="Username" ng-model="vm.username">
          </label>
          <label class="item item-input">
              <input type="password" placeholder="Password" ng-model="vm.password">
          </label>
      </div>
      <button class="button button-block button-calm" ng-click="vm.login()">Login</button>
      <button class="button button-block button-google icon ion-social-googleplus-outline" ng-click="vm.loginWithGoogle()">
        Login with Google
      </button>
  </ion-content>
</ion-view>
```

### 3. Add the Login controller

```js
// /www/app/account/login.controller.js

(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController)

  LoginController.$inject = ['$state', '$ionicPopup', 'auth', 'store'];

  function LoginController($state, $ionicPopup, auth, store) {
    var vm = this;

    vm.login = login;
    vm.loginWithGoogle = loginWithGoogle;

    // Log in with username and password
    function login() {
      auth.signin({
        connection: 'Database-Connection',  // The name of your database connection
        username: vm.username,
        password: vm.password,
        authParams: {
          scope: 'openid name email' //Details: https://auth0.com/docs/scopes
        }
      }, onLoginSuccess, onLoginFailed);
    }

    // Log in with Google
    function loginWithGoogle() {
      auth.signin({
        popup: true,
        connection: 'google-oauth2',
        scope: 'openid name email' //Details: https://auth0.com/docs/scopes
      }, onLoginSuccess, onLoginFailed);
    }

    // Login success callback which saves the user's tokens and redirects back to home 
    function onLoginSuccess(profile, token, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', token);
      store.set('accessToken', accessToken);
      store.set('refreshToken', refreshToken);

      $state.go("home");
    }

    // Login fall callback which displays error message
    function onLoginFailed() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    }
  }

} ());
```