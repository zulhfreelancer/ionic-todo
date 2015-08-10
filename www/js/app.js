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
    $scope.todoAdd = function(formData){
      // all form data
      console.log(formData);

      // only todoInput data
      console.log(formData.todoInput);

      // assign todoInput form data into a variable
      var todoInput = formData.todoInput;

      //check to see if text has been entered, if is empty, exit this function
      if (todoInput == null || todoInput == ''){return;}

      //if there is text, add it to the array (list inside the view)
      $scope.todoList.push({todoText:todoInput, done:false});

      //clear the textbox
      document.getElementById('todoInput').value = "";

      //resave the list to localstorage
      localStorage.setItem("mytodos", angular.toJson($scope.todoList));

    };

    //The update function waits 100ms to store the data in local storage
    $scope.update = function(x) {
      // x = an item from todoList array inside the view
      // console which item is being clicked
      console.log(x.todoText);

      //update local storage 100 ms after the checkbox is clicked to allow it to process
      setTimeout(function(){
        localStorage.setItem("mytodos", angular.toJson($scope.todoList));
      },100)
    };

    $scope.remove = function() {
      //copy list
      var oldList = $scope.todoList;
      //clear list
      $scope.todoList = [];
      //cycle through list
      angular.forEach(oldList, function(x) {
        //add any non-done items to todo list
        if (!x.done) {
          $scope.todoList.push(x);
        }
      });
      //update local storage
      localStorage.setItem("mytodos", angular.toJson($scope.todoList));
    };

}]);
