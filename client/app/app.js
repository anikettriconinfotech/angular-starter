(function() {

    'use strict';

    var app = angular.module('starter', [
        // Third Party Dependencies
        'ui.router',
        'ngMaterial', 
        'ngMessages',    

        //App Dependencies
        'starter.core',
        'starter.test']);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider.
            state('home',{
                url : '/home',
                templateUrl : 'app/test/home.html',
                controller : 'HomeController',
                controllerAs : 'home'
            })
            .state('view2',{
                url: '/view2',
                templateUrl: 'app/test/view2.html',
                controller: 'View2Controller',
                controllerAs: 'view2'
            });

        $urlRouterProvider.otherwise('/home');
    }]);

})();

