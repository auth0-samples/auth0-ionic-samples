(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService', '$scope'];

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
