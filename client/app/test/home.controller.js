(function() {

    'use strict';

    var app = angular.module('starter.test');

    app.controller('HomeController',HomeController);

    function HomeController() {

        var vm = this;
        vm.name = 'home';
    }      

})();
