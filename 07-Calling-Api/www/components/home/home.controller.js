(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService', '$scope', '$http', '$ionicPopup'];

  function HomeController($state, authService, $scope, $http, $ionicPopup) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.ping = ping;
    vm.securedPing = securedPing;

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
          template: 'It looks like the server isn’t launched. Launch it by \
          <a href="https://github.com/auth0-samples/auth0-ionic-samples/tree/master/Server">instructions to launch</a>'
        });
      }
    }

  }

}());
