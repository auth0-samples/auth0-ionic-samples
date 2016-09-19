# Calling API

This example shows how to make authenticated API calls using the JSON Web Token given by Auth0 in your Ionic application.
You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/native/ionic/07-calling-apis). 

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


## Create a Simple Server

To demonstrate how a server would handle public and private endpoints, you can create a simple `node.js` server based on [`express`](https://expressjs.com/) and [`express-jwt`](https://github.com/auth0/express-jwt) with only two endpoints: `/ping` and `/secured/ping`:

```javascript
/* ===== ./server.js ===== */
var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');

var authenticate = jwt({
  secret: new Buffer('YOUR_SERCRET', 'base64'),
  audience: 'YOUR_CLIENT_ID'
});

app.use(cors());

app.get('/ping', function(req, res) {
  res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

app.get('/secured/ping', authenticate, function(req, res) {
  res.send(200, {text: "All good. You only get this message if you're authenticated"});
});

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
```

Both endpoints send a JSON response with a message attribute, but `/secured/ping` uses the __authenticate__ callback to validate the token received in the `Authorization` header. `express-jwt` is responsible for parsing and validating the token. (For more details, see the [express-jwt](https://github.com/auth0/express-jwt) documentation). 

To test the server, run `node server.js`. It should be listening on port 3001 of `localhost`.

Also you can [view](https://github.com/auth0-samples/auth0-ionic-samples/tree/master/Server) the simple server on GitHub.


## Important Snippets

### 1. Add `SERVER_PATH` const to auth0 variables

```js
/* ===== www/auth0.variables.js ===== */
var AUTH0_CLIENT_ID='{CLIENT_ID}';
var AUTH0_CALLBACK_URL=location.href;
var AUTH0_DOMAIN='{DOMAIN}';
var SERVER_PATH = 'http://localhost:3001';
```

### 2. Add `ping`, `securedPing` methods and their callbacks in the home controller

```js
/* ===== www/components/home/home.controller.js ===== */
(function () {

  ...

  function HomeController($state, authService, $scope, $http, $ionicPopup) {
    
    ...

    function ping() {
      $http.get(SERVER_PATH + '/ping')
        .success(onPingSuccess)
        .error(onPingFail);
    }

    function securedPing() {
      $http.get(SERVER_PATH + '/secured/ping')
        .success(onPingSuccess)
        .error(onPingFail);
    }

    function onPingSuccess(response) {
      $ionicPopup.alert({
        title: 'Congratulations!',
        template: response.text
      });
    }

    function onPingFail(error, status) {
      if (status === 401) {
        $ionicPopup.alert({
          title: 'Unauthorized',
          template: 'You not authorized to view this page.'
        });
      } else {
        $ionicPopup.alert({
          title: 'Error',
          template: 'It seems simple server are not launched. \
          <a href="https://github.com/auth0-samples/auth0-ionic-samples/tree/master/Server">more details</a>'
        });
      }
    }

  }

}());
```

### 3. Display `ping` and `securedPing` buttons in the home view 

```html
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

    <div>
      <button class="button button-full button-positive" ng-click="vm.ping()">
        Ping
      </button>

      <button class="button button-full button-positive" ng-click="vm.securedPing()">
        Secured Ping
      </button>
    </div>

  </ion-content>
</ion-view>
```