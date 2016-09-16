# Custom Login

This example shows how to add ***Login/SignUp*** to your application using a custom Login screen.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/02-custom-login). 

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

### 1. Add `auth0.js` and `angular-auth.js` dependencies

```html
<!-- ===== www/index.html ===== -->
<head>
  ...
  <!-- Auth0's JS library -->
  <script src="lib/auth0.js/build/auth0.js"></script>
  <!-- auth0-angular -->
  <script src="lib/angular-auth0/dist/angular-auth0.js"></script>
  ...
</head>
```

### 2. Login with auth0	

```js
/* ===== www/components/auth/auth.service.js ===== */
(function () {

  ...

  function authService($rootScope, angularAuth0, authManager, jwtHelper, $location, $ionicPopup) {

    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function login(username, password) {
      angularAuth0.login({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password
      }, onAuthenticated, null);
    }

    function signup(username, password, callback) {
      angularAuth0.signup({
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: username,
        password: password
      }, callback);
    }

    function loginWithGoogle() {
      angularAuth0.login({
        connection: 'google-oauth2',
        responseType: 'token',
        popup: true
      }, onAuthenticated, null);
    }


    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
    }

    function authenticateAndGetProfile() {
      var result = angularAuth0.parseHash(window.location.hash);

      if (result && result.idToken) {
        onAuthenticated(null, result);
      } else if (result && result.error) {
        onAuthenticated(result.error);
      }
    }

    function onAuthenticated(error, authResult) {
      if (error) {
        return $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      }

      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();

      angularAuth0.getProfile(authResult.idToken, function (error, profileData) {
        if (error) {
          return console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profileData));
        userProfile = profileData;

        $location.path('/');
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
      login: login,
      logout: logout,
      signup: signup,
      loginWithGoogle: loginWithGoogle,
      checkAuthOnRefresh: checkAuthOnRefresh,
      authenticateAndGetProfile: authenticateAndGetProfile
    }
  }
})();
```

### 3. Display `username` and `password` inputs, `login` and `loginWithGoogle` buttons

```html
<!-- ===== www/components/login/login.html ===== -->
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
