# Login

This example shows how to display the user's profile

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/03-user-profile). 

## Getting Started

To run this quickstart you can fork and clone this repo.

Be sure to set the correct values for your Auth0 application in the `www/app/auth0.variables.js` file.

To run the application

```bash
# Install the dependencies
bower install

# Get the plugins
ionic state restore --plugins

# Run
ionic serve
```

## Important Snippets

### 1. Save user profile in login callback

```js
// ./www/app/account/login.controller.js

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

### 2. Access Profile in Home Controller

```js
// /www/app/home/home.controller.js

(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$scope', '$state', 'auth', 'store'];

    function HomeController($scope, $state, auth, store) {
        var vm = this;

        $scope.$on("$ionicView.beforeEnter", function() {
            vm.profile = store.get('profile'); 
        });
    }
} ());
```

### 3. Display profile in Home view

```html
<!-- /www/app/home/home.html -->

 <ion-view view-title="Auth0 Ionic Quickstart" ng-controller="HomeController as vm">
  <ion-content class="padding">
    <div ng-hide="vm.auth.isAuthenticated">
      <p>Welcome to the Auth0 Ionic Sample! Please log in:</p>
      <button class="button button-full button-positive" ng-click="vm.login()">
        Log In
      </button>
    </div>
    <div ng-show="vm.auth.isAuthenticated">

      <div class="list card">

        <div class="item item-avatar">
          <img src="{{ vm.profile.picture }}">
          <h2>{{ vm.profile.name }}</h2>
        </div>

        <a class="item item-icon-left assertive" ng-click="vm.logout()">
          <i class="icon ion-log-out"></i> Log Out
        </a>

      </div>
    </div>
  </ion-content>
</ion-view>
```
