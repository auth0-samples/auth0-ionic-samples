(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService', '$scope', '$ionicPopup'];

  function HomeController($state, authService, $scope, $ionicPopup) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.showAdminContent = showAdminContent;

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
