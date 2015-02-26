/**
 * Created by hchen on 10/14/2014.
 */

var app = angular.module("PRApp", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', { templateUrl: 'partials/Welcome.html' })
        .when('/signature', { templateUrl: 'partials/Signature.html' })
        .when('/provider', { templateUrl: 'partials/Provider.html' })
        .when('/practitioners', { templateUrl: 'partials/Practitioner.html' })
        .when('/corporateContact', { templateUrl: 'partials/CorporateContact.html' })
        .when('/summary', { templateUrl: 'partials/Summary.html' })
        .when('/confirmation', { templateUrl: 'partials/Confirmation.html' })
        .otherwise({ redirectTo: '/' });
}]);

function ReloadScripts(){
    $('.date').datepicker({
        format: 'mm/dd/yyyy',
        todayBtn: "linked",
        endDate: new Date(),
        autoclose: true,
        language: "en",
        forceParse: true
    });
}