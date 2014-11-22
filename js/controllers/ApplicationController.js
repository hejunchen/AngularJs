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
                $scope.ProviderCategoryList = data;
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
            console.log($scope.CurrentPractitioner);
        }

        $scope.SavePractitioner = function(practitioner){

            var fullName = practitioner.Person.FirstName + ' ' + practitioner.Person.LastName;
            var category = practitioner.Category.Description;
            var email = practitioner.Email ;
            var messageBody = category + ': ' + fullName + ' (' + email + ')';


            var isNew = true;
            for(var i=0; i<=$scope.Application.Practitioners.length-1; i++)
            {
                if($scope.Application.Practitioners[i].Guid == practitioner.Guid)
                {
                    isNew = false;
                    var newPract = {};
                    jQuery.extend(newPract, practitioner);
                    $scope.Application.Practitioners[i] = newPract;
                    swal('Saved!', messageBody, 'success');
                }
            }

            if (isNew)
            {
                console.log('Found New: ' + isNew);
                var newPract = {};
                jQuery.extend(newPract, practitioner);
                $scope.Application.Practitioners.push(newPract);
                swal('Added', messageBody, 'success');
                console.log('new pract is added');
            }
            else
            {
                //do something if it is not new
            }

            //re-generate the SeqNum for each practitioner (display purpose)
            //note, the unique key for each practitioner should still be their GUID
            if($scope.Application.Practitioners && $scope.Application.Practitioners.length > 0)
            {
                for(var i=0; i<=$scope.Application.Practitioners.length-1; i++)
                {
                    $scope.Application.Practitioners[i].SeqNum = parseInt(i + 1);
                }
            }

            $scope.CurrentPractitioner = null;

        }

        $scope.EditPractitioner = function(practitioner){
            var currPract = {};
            jQuery.extend(currPract, practitioner);
            $scope.CurrentPractitioner = currPract;
        }

        $scope.DeletePractitioner = function(practitioner){

            if(confirm('Do you want to delete this practitioner?'))
            {
                var index = $scope.Application.Practitioners.indexOf(practitioner);
                $scope.Application.Practitioners.splice(index,1);
                swal('Deleted!!', 'You have removed a practitioner!', 'success');
                $scope.CurrentPractitioner = null;
                return true;
            }

            return false;

        }







        //$scope.GetCodeTable_ProviderCategoryList(CodeTableLoaderService);




        //$scope.GetCodeTable_ProviderCategoryList();

//        console.log('Print out the Provider Category List Here:');
//        console.log($scope.Application.ProviderCategoryList);

    }]
);