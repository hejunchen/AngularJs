/**
 * Created by hchen on 10/7/2014.
 */

var app = angular.module("myApp", []);


app.controller("customersController", function($scope,$http){
    $http.get("http://www.w3schools.com/website/Customers_JSON.php")
        .success(function(response){
            $scope.names = response;
        });
});


app.controller("personController", function($scope){
    $scope.person = {
        firstName: "John",
        lastName: "Doe",
        income: 100000
    };
    $scope.fullName = function() {
        var x = $scope.person;
        return x.firstName + " " + x.lastName;
    };
    $scope.myVar = false;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };
});

