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

    $scope.removeTodo = function(start){
        $scope.todos.splice(start, 1);
    };

    $scope.move = function(index){
        if (index === $scope.todos.length - 1){
            return;
        }
        var todo = $scope.todos[index];
            $scope.todos.splice(index +2 , 0, todo);
            $scope.todos.splice(index, 1);
        
    };
}]);