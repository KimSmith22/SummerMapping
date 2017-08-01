var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http, $filter) {
    console.log("Hello World from controller");
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.q = '';

    $scope.getData = function(){
      return $filter('filter')($scope.data, $scope.q)
    }

    $scope.numberOfPages = function(){
      return Math.ceil($scope.getData().length/$scope.pageSize);
    }

    // for(var i = 0; i < eventlist.length; i++){
    //   $scope.data.push("Item " + i);
    // }

var refresh = function(){
  $http.get('/eventlist/').then(function(response) {
    console.log("I got the data I requested");
    $scope.eventlist = response.data;
    $scope.event = null;
  });
};

refresh();

  $scope.addEvent = function () {
    console.log($scope.event);
    $http.post('/eventlist/', $scope.event).then(function(response){
      console.log(response);
      refresh();
    });
    $scope.update = function() {
      console.log($scope.event._id);
      $http.put('/eventlist/' + $scope.event._id, $scope.event).then(function(response) {
        refresh();
      })
    };
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/eventlist/' + id).then(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/eventlist/' + id).then(function(response) {
      $scope.event = response;
    });
  };


  $scope.deselect = function() {
    $scope.event = null;
    refresh();
  };

  }]);﻿

  app.filter('startFrom', function(){
    return function(input, start){
      start = +start;
      return input.slice(start);
    }
  });
