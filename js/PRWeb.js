/**
 * Created by hchen on 10/14/2014.
 */
var app = angular.module("PRApp", []);

app.factory('CorporateContactFactory', function(){

    var CorporateContactClass = function() {
        this.Person = {
                        title: '',
                        firstName: '',
                        middleName: '',
                        lastName: ''
                        };
        this.Phone = '';
        this.Email = '';

        this.PrintAll = function () {
            console.log('Print All for: CorporateContact');
            console.log('Person: ' + this.Person);
            console.log('Phone: ' + this.Phone);
            console.log('Email: ' + this.Email);
        };
    };

    return CorporateContactClass;

});

app.factory('PractitionerFactory', function(){

    var PractitionerClass = function(){
        this.Category = { nodeId: -1, name: ''};
        this.AssigningAuthority = { nodeId: -1, name: ''};
        this.EffectiveDateAtLocation = new Date();
        this.RegistrationNumber = '';
        this.EffectiveDateOfRegistration = new Date();
        this.Person = {
                        title: '',
                        firstName: '',
                        middleName: '',
                        lastName: ''
                        };
        this.Email = '';

        this.PrintAll = function(){
            console.log('Print All for: Practitioner');
            console.log('Category: ' + this.Category);
            console.log('AssigningAuthority: ' + this.AssigningAuthority);
            console.log('EffectiveDateAtLocation: ' + this.EffectiveDateAtLocation);
            console.log('RegistrationNumber: ' + this.RegistrationNumber);
            console.log('EffectiveDateOfRegistration: ' + this.EffectiveDateOfRegistration);
            console.log('Person: ' + this.Person);
            console.log('Email: ' + this.Email);
        };

    };

    return PractitionerClass;

});

app.factory('ProviderFactory', function(){

    var ProviderClass = function(){
        this.Category = { nodeId: -1, name: ''};
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
            console.log('Print All for: Provider');
            console.log('Category: ' + this.Category);
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
            console.log('Print All for: Signature');
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

app.controller("HomeController", ['$scope','$http','SignatureFactory','ProviderFactory','PractitionerFactory','CorporateContactFactory',
    function($scope,$http,SignatureFactory,ProviderFactory,PractitionerFactory,CorporateContactFactory){

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