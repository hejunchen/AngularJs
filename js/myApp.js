/**
 * Created by hchen on 10/7/2014.
 */

var app = angular.module("myApp", []);


app.controller("customersController", function($scope,$http){
    $http.get("http://www.w3schools.com/website/Customers_JSON.php")
        .success(function(data){
            $scope.names = data;
        });
});


app.controller("codeTableController", function($scope,$http){
    $http.get("http://hchenworkpc.pbchbs.com/ProviderRegistration/api/codetable")
        .success(function(data){
            $scope.codeTables = data;
            console.log('CodeTables data are loaded');
        });

    $scope.GetCodeTableByName = function(name){
        for(var x in $scope.codeTables) {
            console.log('Compare the code-table-name [' + x.CodeTableName + '] with parameter name [' + name + ']');
            if (x.CodeTableName == name)
            {
                console.log('found match');
                return x;
            }
        }
        console.log('not found');
    };

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
