// MODULE
var todoApp = angular.module('todoApp', []);

// CONTROLLERS
todoApp.controller('homeController', ['$scope', function($scope){
    $scope.todos = [ 
        {done:true,text:'first'},
        {done:false,text:'second'}
    ];
}]);