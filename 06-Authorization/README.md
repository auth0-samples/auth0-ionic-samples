# Authorization

This example shows one of the ways of adding ***Authorization*** for a resource in your application.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/06-authorization). 

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

### 1. Check if the user is admin

```js
/* ===== www/components/auth/auth.service.js ===== */
(function() {

  ...

  function authService($rootScope, lock, authManager, jwtHelper, $q) {

    ...

    function isAdmin() {
      return userProfile && userProfile.app_metadata
        && userProfile.app_metadata.roles
        && userProfile.app_metadata.roles.indexOf('admin') > -1;
    }

    return {
      ...
      isAdmin: isAdmin
    }
  }
})();
```

### 2. Add `showAdminContent` method in the home controller

```js
/* ===== www/components/home/home.controller.js ===== */
(function () {

  ...

  function HomeController($state, authService, $scope, $ionicPopup) {
    
    ... 
    
    // Restrict access to secure content
    function showAdminContent() {

      var popup = {};

      if (authService.isAdmin()) {

        // Secure content

        popup = {
          title: 'Congratulations!',
          template: 'You are viewing this because you are logged in and you have \'admin\' role'
        };

      } else {

        // Non-secure content

        popup = {
          title: 'Unauthorized',
          template: 'You are not allowed to see this content'
        };

      }

      // common content

      $ionicPopup.alert(popup);
    }

  }

}());
```

### 3. Display `show admin content` item in the home view

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

        <!-- Show Admin Content item -->
        <a class="item" ng-click="vm.showAdminContent()">
          Show Admin Content
        </a>

        <a class="item item-icon-left assertive" ng-click="vm.logout()">
          <i class="icon ion-log-out"></i> Log Out
        </a>

      </div>


    </div>
  </ion-content>
</ion-view>
```