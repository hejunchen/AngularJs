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

//    Get all code tables from one single function call
//    $http.get("http://hchenworkpc.pbchbs.com/ProviderRegistration/api/codetable")
//        .success(function(data){
//            $scope.codeTables = data;
//            console.log('CodeTables data are loaded');
//        });


    $scope.CurrentCodeTable = null;

    $scope.GetCodeTableByName = function(name){
        var url = "http://hchenworkpc.pbchbs.com/ProviderRegistration/api/codetable/" + name;
        console.log('URL: ' + url.toString());
        $http.get(url)
            .success(function(data){
                console.log('Got data for: ' + name);
                if (data == null)
                {
                    console.log('Data is empty');
                    $scope.CurrentCodeTable = null;
                    //return "[]";
                }
                else
                {
                    console.log('Data is not empty');
                    $scope.CurrentCodeTable = data;
                    //return data;
                }
            });
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

app.controller("validateController", function($scope){
    $scope.user = 'John Doe';
    $scope.email = 'john.doe@gmail.com';
});

