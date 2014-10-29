/**
 * Created by hchen on 10/14/2014.
 */
var app = angular.module("PRApp", []);

app.factory('ProviderFactory', function(){

    var ProviderClass = function(){
        this.ProviderCategory = { id: -1, name: ''};
        this.LegalName = '';
        this.Address = { line1: '',
                         line2: '',
                         line3: '',
                         city: '',
                         prince: {}
                        };

    };
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

app.controller("HomeController", ['$scope', '$http', 'SignatureFactory', function($scope,$http,SignatureFactory){

    $scope.signature = new SignatureFactory();
    $scope.signature.PrintAll();



}]);