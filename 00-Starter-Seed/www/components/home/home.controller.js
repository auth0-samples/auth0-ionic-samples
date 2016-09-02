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
