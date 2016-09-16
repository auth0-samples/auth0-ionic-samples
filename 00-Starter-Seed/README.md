# Seed Project for the Ionic 1 Quickstart

This seed project can be used if you want to follow along with the steps in the [Ionic 1 Quickstart](https://auth0.com/docs/quickstart/native/ionic).

This starter seed is a basic Ionic 1 application with the required Auth0 scripts referenced.

To run this project

```bash
# Install the dependencies
bower install

# Get the plugins
ionic state restore --plugins

# Run
ionic serve
```


## Important Snippets

### 1. Implement the home controller

```js
/* ===== www/components/home/home.controller.js ===== */
(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'lock'];

  function HomeController($state, lock) {
    var vm = this;

    vm.lock = lock;
  }

}());
```

### 2. Add the home view

```html
/* ===== www/components/home/home.html ===== */
<ion-view view-title="Auth0 Ionic Quickstart" ng-controller="HomeController as vm">
  <ion-content class="padding">
    <h3>Welcome to the Auth0 - Ionic integration app. This starter seed is an empty shell.</h3>
  </ion-content>
</ion-view>
```