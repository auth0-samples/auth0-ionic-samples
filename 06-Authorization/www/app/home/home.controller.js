(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$scope', '$state', 'auth', 'store', '$ionicPopup'];

    function HomeController($scope, $state, auth, store, $ionicPopup) {
        var vm = this;

        vm.auth = auth;

        vm.login = login;
        vm.logout = logout;
        vm.showAdminContent = showAdminContent;

        $scope.$on("$ionicView.beforeEnter", function() {
            vm.profile = store.get('profile');
        });

        function login() {
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
        }


        // Restrict access to secure content
        function showAdminContent() {

          var popup = {};

          if (auth.isAdmin()) {

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

} ());
