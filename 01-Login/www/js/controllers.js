angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, Auth) {
  $scope.auth = Auth;
})

.controller('ProfileCtrl', function($scope, Auth) {
  $scope.auth = Auth;

  if (Auth.isAuthenticated()) {
    if (Auth.userProfile) {
      $scope.profile = Auth.userProfile;
    } else {
      
      Auth.getProfile(function(err, profile) {
        if (err) {
          return alert(err);
        }
        $scope.$evalAsync(function() {
          $scope.profile = profile;
        });
      });
    }
  }

});
