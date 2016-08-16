(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'auth', 'store', '$http', '$ionicPopup'];

  function HomeController($scope, $state, auth, store, $http, $ionicPopup) {
    var vm = this;

    vm.auth = auth;

    vm.login = login;
    vm.logout = logout;
    vm.ping = ping;
    vm.securedPing = securedPing;

    $scope.$on("$ionicView.beforeEnter", function () {
      vm.profile = store.get('profile');
    });

    function login() {
      vm.message = null;
      $state.go("login");
    }

    function logout() {
      auth.signout();

      store.remove('profile');
      store.remove('token');
      store.remove('accessToken');
      store.remove('refreshToken');

      // Clear VM value
      vm.profile = null;
      vm.message = null;
    }

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
