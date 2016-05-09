'use strict';

describe('StudentTodoListingController',function() {

  var $scope,$rootScope,studentTodosApiService,controller,controllerConstructor,$state;

  beforeEach(function() {
    module('starter');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();      
      $state  = $injector.get('$state');
      controllerConstructor = $injector.get('$controller');
    });   
  })

  it('should work',function() {

    controller = controllerConstructor('AppController as app',{$scope : $scope });
    expect($scope.app.name).toBe('app');
  });

});

