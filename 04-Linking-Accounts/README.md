# Linking Accounts

This example shows how to link/unlink different `Auth0` users accounts.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/04-linking-acounts). 

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

### 1. Implement sending link/unlink account requests

```js
/* ===== www/components/auth/auth.service.js ===== */
(function () {

  ...

  function authService($rootScope, lock, authManager, jwtHelper, $http, $q) {

    ...

    function linkAccount() {
      try {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var token = localStorage.getItem('id_token');
      } catch (e) {
        return false;
      }

      var options = {
        rememberLastLogin: false,
        auth: {
          params: {
            scope: 'openid',
            device: 'Mobile device'
          }
        }
      };

      var lockLink = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, options);
      var deferred = $q.defer();

      lockLink.on('authenticated', function (authResult) {

        $http({
          method: 'POST',
          url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + profile.user_id + '/identities',
          headers: {
            Authorization: 'Bearer ' + token
          },
          data: {
            link_with: authResult.idToken
          }
        })
          .then(function () {
            lockLink.hide();

            lock.getProfile(token, function (error, profile) {
              if (!error) {
                deferred.resolve(profile);
              } else {
                deferred.reject(error);
              }
            });

          });

      });

      lockLink.show();

      return deferred.promise;

    }

    function unLinkAccount(identity) {
      try {
        var profile = JSON.parse(localStorage.getItem('profile'));
        var token = localStorage.getItem('id_token');
      } catch (e) {
        return false;
      }

      var deferred = $q.defer();

      $http({
        method: 'DELETE',
        url: 'https://' + AUTH0_DOMAIN + '/api/v2/users/' + profile.user_id + '/identities/' + identity .provider + '/' + identity .user_id,
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(function () {

          lock.getProfile(token, function (error, profile) {
            if (!error) {
              deferred.resolve(profile);
            } else {
              deferred.reject(error);
            }
          });

        });

      return deferred.promise;

    }

    return {
      ...
      linkAccount: linkAccount,
      unLinkAccount: unLinkAccount
    }
  }
})();
```

### 2. Update the home controller

```js
/* ===== www/components/home/home.controller.js ===== */
(function () {

  ...
  
  function HomeController($state, authService, $scope) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.linkAccount = linkAccount;
    vm.unLinkAccount = unLinkAccount;

    vm.identities = [];

    $scope.$on("$ionicView.beforeEnter", function () {

      authService.getProfileDeferred().then(function(profile) {
        vm.profile = profile;
        refreshIdentities();
      });

    });

    function refreshIdentities() {
      vm.profile.identities.shift();
      vm.identities = vm.profile.identities;
    }

    function linkAccount() {
      authService.linkAccount()
        .then(function (profile) {
          vm.profile = profile;
          localStorage.setItem('profile', JSON.stringify(profile));
          refreshIdentities();
        })
    }

    function unLinkAccount(account) {
      account.hiddenItem = true;
      authService.unLinkAccount(account)
        .then(function (profile) {
          vm.profile = profile;
          localStorage.setItem('profile', JSON.stringify(profile));
          refreshIdentities();
        });
    }

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

### 3. Display link account button and profile identities in the home view

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
        
        <div class="item item-avatar item-button-right assertive" ng-repeat="identity in vm.identities">
          <img src="{{identity.profileData.picture }}">
          <h2>{{ identity.profileData.name || identity.profileData.email }}</h2>
          <button class="button button-assertive" ng-click="vm.unLinkAccount(identity)">
            <i class="icon ion-android-delete" ></i>
          </button>
        </div>
        
        <a class="item item-icon-left" ng-click="vm.linkAccount()">
          <i class="icon ion-link"></i> Link Account
        </a>
        
        <a class="item item-icon-left assertive" ng-click="vm.logout()">
          <i class="icon ion-log-out"></i> Log Out
        </a>
      </div>
    </div>
  </ion-content>
</ion-view>
```

