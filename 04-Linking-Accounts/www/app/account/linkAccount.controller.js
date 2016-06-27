(function () {
  'use strict';

  angular
    .module('app')
    .controller('LinkAccountController', LinkAccountController)

  LinkAccountController.$inject = ['$scope', '$state', 'auth', 'store'];

  function LinkAccountController($scope, $state, auth, store) {
    var vm = this;

    vm.linkAccount = linkAccount;

    vm.providers = [
      { title: 'Facebook', value: 'facebook', icon: 'ion-social-facebook' },
      { title: 'Github', value: 'github', icon: 'ion-social-github' },
      { title: 'Google', value: 'google-oauth2', icon: 'ion-social-google' },
      { title: 'Twitter', value: 'twitter', icon: 'ion-social-twitter' }
    ]

    // $scope.$on("$ionicView.beforeEnter", function () {
    //   vm.provider = null;
    // });

    function linkAccount(provider) {
      var profile = store.get('profile');
      var token = store.get('token');
      var options = {connection: provider};

      auth.linkAccount(token, profile, options,
        function () {

        },
        function () {

        });
    }


  }

} ());