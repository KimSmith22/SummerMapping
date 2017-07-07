var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function(){
  $http.get('/eventlist/').then(function(response) {
    console.log("I got the data I requested");
    $scope.eventlist = response;
  });
};

refresh();

  $scope.addEvent = function () {
    console.log($scope.event);
    $http.post('/eventlist/', $scope.event).then(function(response){
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/eventlist/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/eventlist/' + id).success(function(response) {
      $scope.contact = response;
    });
  };

  $scope.update = function() {
    console.log($scope.contact._id);
    $http.put('/eventlist/' + $scope.contact._id, $scope.contact).success(function(response) {
      refresh();
    })
  };

  $scope.deselect = function() {
    $scope.contact = "";
  }

  }]);﻿
