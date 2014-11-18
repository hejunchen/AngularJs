/**
 * Created by hchen on 11/3/2014.
 */

app.controller("ApplicationController", ['$scope','$http','ApplicationService','CodeTableLoaderService',
    function($scope,$http,ApplicationService,CodeTableLoaderService){

//        var CodeTableApiUrl = "http://hchenworkpc.pbchbs.com/ProviderRegistration/api/codetable/";
//
//        var getCodeTable_ProviderCategoryList = function(){
//            var query = 'ProviderCategory';
//            var url = CodeTableApiUrl + query;
//            $http.get(url)
//                .success(function(data){
//                    $scope.ProviderCategoryList = data;
//                    console.log($scope.ProviderCategoryList);
//                });
//        }
//
//
//        var getCodeTable_ProvinceList = function(){
//            var query = 'Province';
//            var url = CodeTableApiUrl + query;
//            $http.get(url)
//                .success(function(data){
//                    data.CodeTable = data.CodeTable;
//                    $scope.ProvinceList = data;
//                    console.log($scope.ProvinceList);
//                });
//        }

        $scope.init = function(){

            console.log('AppController Init()');

            $scope.Application = ApplicationService.getApplication();

            CodeTableLoaderService.getCodeTableByType('ProviderCategory').then(function(data){
                $scope.ProviderCategoryList=data;
            });

            CodeTableLoaderService.getCodeTableByType('Province').then(function(data){
                $scope.ProvinceList = data;
            });

            CodeTableLoaderService.getCodeTableByType('PractitionerCategory').then(function(data){
                $scope.PractitionerCategoryList = data;
            });

            CodeTableLoaderService.getCodeTableByType('PractitionerAssigningAuthority').then(function(data){
                $scope.PractitionerAssigningAuthorityList = data;
            });


            $scope.CurrentPractitioner = null;


        }

        $scope.init();

        $scope.SetNewPractitionerToCurrent = function(){
            $scope.CurrentPractitioner = ApplicationService.getEmptyPractitioner();
        }




        //$scope.GetCodeTable_ProviderCategoryList(CodeTableLoaderService);




        //$scope.GetCodeTable_ProviderCategoryList();

//        console.log('Print out the Provider Category List Here:');
//        console.log($scope.Application.ProviderCategoryList);

    }]
);