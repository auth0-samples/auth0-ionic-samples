# Rules

This example shows how to work with `Auth0` rules, more information about them can be found [here](https://auth0.com/docs/rules).

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/05-rules). 

## Getting Started

To run this quickstart you can fork and clone this repo.

Be sure to set the correct values for your Auth0 application in the `www/auth0.variables.js` file.

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

### 1. Update the home controller
 
```js
/* ===== www/components/home/home.controller.js ===== */
(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService', '$scope'];

  function HomeController($state, authService, $scope) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;

    $scope.$on("$ionicView.beforeEnter", function() {

      authService.getProfileDeferred().then(function(profile) {
        vm.profile = profile;
      });

    });

    function login() {
      $state.go("login");
    }

    function logout() {
      authService.logout();

      // Clear VM value
      vm.profile = null;
    }

  }

}());
```

### 2. Display user country in the home view

```html
<!-- ===== www/components/home/home.html ===== -->
<ion-view view-title="Auth0 Ionic Quickstart" ng-controller="HomeController as vm">
  <ion-content class="padding">
    <div ng-hide="isAuthenticated">
      <p>Welcome to the Auth0 Ionic Sample! Please log in:</p>
      <button class="button button-full button-positive" ng-click="vm.login()">
        Log In
      </button>
    </div>
    <div ng-show="isAuthenticated">
      <div class="list card">
        <div class="item item-avatar">
          <img src="{{ vm.profile.picture }}">
          <h2>{{ vm.profile.name }}</h2>
          
          <span ng-if="vm.profile.country" class="additional-info">Country (added by rule): <strong>{{ vm.profile.country }}</strong></span>
          
        </div>
        <a class="item item-icon-left assertive" ng-click="vm.logout()">
          <i class="icon ion-log-out"></i> Log Out
        </a>
      </div>
    </div>
  </ion-content>
</ion-view>
```