/**
 * Created by hchen on 11/3/2014.
 */

app.controller("ApplicationController", ['$scope','$http','$routeParams','SignatureFactory','ProviderFactory','PractitionerFactory','CorporateContactFactory',
    function($scope,$http,$routeParams,SignatureFactory,ProviderFactory,PractitionerFactory,CorporateContactFactory){

        $scope.practId = $routeParams.practitionerGuid;

        $scope.providerCategories = [];
        $scope.GetCodeTableByName = function(name){
            var url = "http://hchenworkpc.pbchbs.com/ProviderRegistration/api/codetable/" + name;

            console.log('URL: ' + url.toString());
            $http.get(url)
                .success(function(data){
                    console.log('Got data for: ' + name);
                    if (data == null)
                    {
                        console.log('Data is empty');
                        $scope.providerCategories = null;
                        //return "[]";
                    }
                    else
                    {
                        console.log('Data is not empty');
                        $scope.providerCategories = data;
                        //return data;
                    }
                });
        };


        var OpticalStoreProviderCategoryNodeId = 5011;

        $scope.application = {
            signature: null,
            provider: null,
            practitioners: [],
            corporateContact: null,
            IsOpticalStore: function(){
                return (this.provider.Category.nodeId === OpticalStoreProviderCategoryNodeId);
            }
        };

        $scope.CreateNewApplication = function(){

            console.log('Creating a new application now.')

            var signature = new SignatureFactory();
            signature.PrintAll();
            $scope.application.signature = signature;

            var provider = new ProviderFactory();
            provider.PrintAll();
            $scope.application.provider = provider;

            var practitioner = new PractitionerFactory();
            practitioner.PrintAll();
            $scope.application.practitioners.push(practitioner);

            var corporateContact = new CorporateContactFactory();
            corporateContact.PrintAll();
            $scope.application.corporateContact = corporateContact;

            console.log($scope.application.IsOpticalStore());

        };
    }]);