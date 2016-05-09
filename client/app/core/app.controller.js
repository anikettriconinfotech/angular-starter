(function() {

    'use strict';

    var app = angular.module('starter.core');

    app.controller('AppController',AppController);

    function AppController() {

        var vm = this;
        vm.name = 'app';
    }      

})();
