/**
 * Created by hchen on 11/3/2014.
 */

app.controller("ApplicationController", ['$scope','$http','ApplicationService',
    function($scope,$http,ApplicationService){

        var CodeTableApiUrl = "http://hchenworkpc.pbchbs.com/ProviderRegistration/api/codetable/";

        var getCodeTable_ProviderCategoryList = function(){
            var query = 'ProviderCategory';
            var url = CodeTableApiUrl + query;
            $http.get(url)
                .success(function(data){
                    $scope.ProviderCategoryList = data;
                    console.log($scope.ProviderCategoryList);
                });
        }


        var getCodeTable_ProvinceList = function(){
            var query = 'Province';
            var url = CodeTableApiUrl + query;
            $http.get(url)
                .success(function(data){
                    var prov = data.CodeTable;
                    for (i=length-1; i >= 0; i--){
                        if (prov[i].ParentLevelNo == $scope.Application.Provider.Address.country.nodeId)
                        {
                            prov.remove(prov[i]);
                        }
                    }
                    data.CodeTable = prov;
                    $scope.ProvinceList = data;
                    console.log($scope.ProvinceList);
                });
        }

        $scope.init = function(){

            console.log('AppController Init()');

            $scope.Application = ApplicationService.getApplication();
            getCodeTable_ProviderCategoryList();

            getCodeTable_ProvinceList();


        }


        $scope.init();


        //$scope.GetCodeTable_ProviderCategoryList(CodeTableLoaderService);




        //$scope.GetCodeTable_ProviderCategoryList();

//        console.log('Print out the Provider Category List Here:');
//        console.log($scope.Application.ProviderCategoryList);

    }]
);