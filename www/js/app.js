var app = angular.module('myApp', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('todoCtrl', ['$scope', function($scope) {
    //if local storage is null save the todolist to local storage
   if (localStorage.getItem("mytodos") == null){
      $scope.todoList = [ {todoText:'Create app', done:false} ];
      localStorage.setItem("mytodos", angular.toJson($scope.todoList));
    } else {
    //get the todolist from local storage
      $scope.todoList = angular.fromJson(localStorage.getItem("mytodos"));
   }

    // Add an item function
    $scope.todoAdd = function() {
      console.log($scope.todoInput);
    };
}]);
