/**
 * Created by hchen on 10/14/2014.
 */
var app = angular.module("PRApp", []);


app.factory('ProviderFactory', function(){

    var ProviderClass = function(){
        this.ProviderCategory = { nodeId: -1, name: ''};
        this.LegalName = '';
        this.Address = { line1: '',
                         line2: '',
                         line3: '',
                         city: '',
                         province: { nodeId: -1, name: ''},
                         postalCode: '',
                         country: { nodeId: 1, name: 'Canada' }
                        };
        this.Phone = '';
        this.Fax = '';
        this.Email = '';

        this.PrintAll = function(){
            console.log('ProviderCategory: ' + this.ProviderCategory);
            console.log('LegalName: ' + this.LegalName);
            console.log('Address: ' + this.Address);
            console.log('Phone: ' + this.Phone);
            console.log('Fax: ' + this.Fax);
            console.log('Email: ' + this.Email);
        };

    };



    return ProviderClass;
});

app.factory('SignatureFactory', function(){


    var SignatureClass = function(){

        //some initialization code here
        var today = new Date();
        var date = today.getDate() + '';
        var month = (today.getMonth() + 1) + '';
        var year = today.getFullYear();

        this.AppDate = date + '-' + month + '-' + year;
        this.WhoYouAre = 'I am the Provider';
        this.Name = 'Hejun Chen';
        this.OccupationTitle = '';
        this.Phone = '';
        this.Email = '';

        this.PrintAll = function(){
            console.log('AppDate: ' + this.AppDate);
            console.log('WhoYouAre: ' + this.WhoYouAre);
            console.log('Name: ' + this.Name);
            console.log('OccupationTitle: ' + this.OccupationTitle);
            console.log('Phone: ' + this.Phone);
            console.log('Email: ' + this.Email);
        };

    };

    return SignatureClass;

});

app.controller("HomeController", ['$scope','$http','SignatureFactory','ProviderFactory',function($scope,$http,SignatureFactory,ProviderFactory){

    var OpticalStoreProviderCategoryNodeId = 5011;



    $scope.application = {
        signature: null,
        provider: null,
        practitioners: [],
        corporateContact: null,
        IsOpticalStore: function(){
            return this.provider.ProviderCategory.nodeId === OpticalStoreProviderCategoryNodeId;
        }
    };

    $scope.CreateNewApplication = function(){

        alert('Creating a new application now.')

        var signature = new SignatureFactory();
        signature.PrintAll();
        $scope.application.signature = signature;

        var provider = new ProviderFactory();
        provider.PrintAll();
        $scope.application.provider = provider;


        console.log($scope.application.IsOpticalStore());

    };


}]);