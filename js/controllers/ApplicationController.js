/**
 * Created by hchen on 11/3/2014.
 */

app.controller("ApplicationController", ['$scope','$http','ApplicationService',
    function($scope,$http,ApplicationService){

//        $scope.providerCategories = [];
//        $scope.GetCodeTableByName = function(name){
//            var url = "http://hchenworkpc.pbchbs.com/ProviderRegistration/api/codetable/" + name;
//
//            console.log('URL: ' + url.toString());
//            $http.get(url)
//                .success(function(data){
//                    console.log('Got data for: ' + name);
//                    if (data == null)
//                    {
//                        console.log('Data is empty');
//                        $scope.providerCategories = null;
//                        //return "[]";
//                    }
//                    else
//                    {
//                        console.log('Data is not empty');
//                        $scope.providerCategories = data;
//                        //return data;
//                    }
//                });
//        };

        $scope.Application = ApplicationService.getApplication();


    }]
);