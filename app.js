// MODULE
var todoApp = angular.module('todoApp', []);

// CONTROLLERS
todoApp.controller('homeController', ['$scope', function($scope){
    $scope.todos = [ 
        {done:true,text:'first'},
        {done:false,text:'second'}
    ];
    $scope.addTodo = function(){
        var newTodo ={
            done:false,
            text:$scope.todoText
        };
    $scope.todos.push(newTodo);
    $scope.todoText = '';   
    };
}]);