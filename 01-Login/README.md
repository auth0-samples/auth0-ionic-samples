# Login

This example shows how to add ***Login/SignUp*** to your application using the `Lock` widget.

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

### 1. Add the module dependencies and configure the service

```js
/* ===== www/app.js ===== */
(function () {

  'use strict';

  angular
    .module('app', ['ionic', 'auth0.lock', 'angular-jwt'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', 'lockProvider', 'jwtOptionsProvider'];

  function config($stateProvider, $urlRouterProvider, lockProvider, jwtOptionsProvider) {
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'components/login/login.html'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      options: {
        auth: {
          params: {
            scope: 'openid',
            device: 'Mobile device'
          }
        }
      }
    });

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });

  }

})();
```

```js
/* ===== www/app.run.js ===== */
(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$ionicPlatform', '$rootScope', 'authService'];

  function run($ionicPlatform, $rootScope, authService) {
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

      // Register the authentication listener that is
      // set up in auth.service.js
      authService.registerAuthenticationListener();

      //This event gets triggered on URL change
      $rootScope.$on('$locationChangeStart', authService.checkAuthOnRefresh);

    });

    // Check is the user authenticated before Ionic platform is ready
    authService.checkAuthOnRefresh();
  }

})();
```

### 2. Implement the auth service

```js
/* ===== www/components/auth/auth.service.js ===== */
(function() {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$rootScope', 'lock', 'authManager', 'jwtHelper'];

  function authService($rootScope, lock, authManager, jwtHelper) {

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

        // Redirect to default page
        location.hash = '#/';

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));

        });
      });
    }

    function checkAuthOnRefresh() {
      var token = localStorage.getItem('id_token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!$rootScope.isAuthenticated) {
            authManager.authenticate();
          }
        }
      }
    }

    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
      checkAuthOnRefresh: checkAuthOnRefresh
    }
  }
})();
```

### 3. Implement the login controller

```js
/* ===== www/components/login/login.controller.js ===== */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'authService'];

  function LoginController($state, authService) {
    var vm = this;

    function doLogin() {
      authService.login();
    }

    doLogin();
  }

} ());
```

### 4. Add the login view

```html
<!-- ===== www/components/login/login.html ===== -->
<ion-view view-title="Log In" ng-controller="LoginController as vm">
  <ion-content class="center">
    <div class="row">
      <div class="col"></div>
    <div>
  </ion-content>
</ion-view>
```

### 5. Update the home controller

```js
/* ===== www/components/home/home.controller.js ===== */
(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService'];

  function HomeController($state, authService) {
    var vm = this;

    vm.login = login;
    vm.logout = authService.logout;

    function login() {
      $state.go("login");
    }

  }

}());
```

### 6. Update the home view

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
      <p>Thank you for logging in!</p>
      <button class="button button-full button-dark" ng-click="vm.logout()">
        Log Out
      </button>
    </div>
  </ion-content>
</ion-view>
```