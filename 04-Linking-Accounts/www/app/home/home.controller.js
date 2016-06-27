(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController)

    HomeController.$inject = ['$scope', '$state', 'auth', 'store'];

    function HomeController($scope, $state, auth, store) {
        var vm = this;

        vm.auth = auth;

        vm.linkAccount = linkAccount;
        vm.login = login;
        vm.logout = logout;

        $scope.$on("$ionicView.beforeEnter", function() {
            vm.profile = store.get('profile'); 
        });

        function linkAccount() {
            $state.go("link");
        }

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

    }

} ());