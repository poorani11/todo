// MODULE
var todoApp = angular.module('todoApp', ['firebase','ngRoute']);

// ROUTES
todoApp.config(function ($routeProvider){

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'MyAuthCtrl'
    })
    .when('/signup', {
        templateUrl: 'pages/signup.html',
        controller: 'MyAuthCtrl'
    })
    .when('/todolist', {
        templateUrl: 'pages/todo.html',
        controller: 'homeController'
    })
});

// CONTROLLERS
todoApp.controller("MyAuthCtrl", ["$scope", "$firebaseAuth",'$location', function($scope, $firebaseAuth,$location) {
    var ref = new Firebase("https://angularjs-trello.firebaseio.com/");
    $scope.authObj = $firebaseAuth(ref);
    
    $scope.loginTodo = function(){
        ref.authWithPassword({
        email    : $scope.email,
        password : $scope.password
        }, function(error, authData) {
        if (error) {
        console.log("Login Failed!", error);
        } else {
        console.log("Authenticated successfully with payload:", authData);
        $location.path('/todolist');
        }
        });
    };

    $scope.signupTodo = function(){
        ref.createUser({
          email    : $scope.email,
          password : $scope.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            $scope.loginTodo();
            
          }
        });
    };    
}]);

todoApp.controller('homeController', ['$scope','angularFire', function($scope,angularFire){
    var fireData = new Firebase('https://angularjs-trello.firebaseio.com/');
    angularFire(fireData, $scope, 'todos');
    
    $scope.todos = [ 
    ];
    $scope.addTodo = function(){
        var newTodo ={
            done:false,
            text:$scope.todoText
        };
    $scope.todos.push(newTodo);
    $scope.todoText = '';   
    };

    $scope.removeTodo = function(start){
        $scope.todos.splice(start, 1);
    };

    $scope.move = function(index, direction){
        if(direction === 'up')
        {
            if(index === 0){
                return;
            }
            index = index - 1;
        }
        if(direction === 'down'){
            if (index === $scope.todos.length - 1){
                return;
            }
        }
        var todo = $scope.todos[index];
            $scope.todos.splice(index +2 , 0, todo);
            $scope.todos.splice(index, 1);
        
    };
}]);