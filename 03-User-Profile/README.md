# User's Profile

This example shows how to display the user's profile

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/03-user-profile). 

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

### 1. Save user profile in authenticated event callback

```js
/* ===== www/components/auth/auth.service.js ===== */
(function() {

  ... 
  
  function authService($rootScope, lock, authManager, jwtHelper, $q) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
    var deferredProfile = $q.defer();

    if (userProfile) {
      deferredProfile.resolve(userProfile);
    }

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      deferredProfile = $q.defer();
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

          // Redirect to default page
          location.hash = '#/';

          deferredProfile.resolve(profile);
        });
      });
    }

    function getProfileDeferred() {
      return deferredProfile.promise;
    }

    ...

    return {
      ...
      getProfileDeferred: getProfileDeferred
    }
  }
})();
```

### 2. Access Profile in the home controller

```js
/* ===== www/components/home/home.controller.js ===== */
(function () {

  ...

  function HomeController($state, authService, $scope) {
    var vm = this;

    ...

    $scope.$on("$ionicView.beforeEnter", function() {

      authService.getProfileDeferred().then(function(profile) {
        vm.profile = profile;
      });

    });

   ...
   
  }

}());
```

### 3. Display profile in the home view

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
        </div>
        <a class="item item-icon-left assertive" ng-click="vm.logout()">
          <i class="icon ion-log-out"></i> Log Out
        </a>
      </div>
    </div>
    
  </ion-content>
</ion-view>
```