(function() {

    'use strict';

    var app = angular.module('agora');

    app.controller('AppController',AppController);

    function AppController() {

        var vm = this;
        vm.name = 'test';
    }      

})();
