/**
 * Created by hchen on 10/14/2014.
 */

var app = angular.module("PRApp", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', { templateUrl: 'partials/Welcome.html', controller: 'ApplicationController'})
        .when('/signature', { templateUrl: 'partials/Signature.html', controller: 'ApplicationController' })
        .when('/provider', { templateUrl: 'partials/Provider.html', controller: 'ApplicationController' })
        .when('/practitioners', { templateUrl: 'partials/Practitioner.html', controller: 'ApplicationController' })
        .when('/corporateContact', { templateUrl: 'partials/CorporateContact.html', controller: 'ApplicationController' })
        .when('/summary', { templateUrl: 'partials/Summary.html', controller: 'ApplicationController' })
        .when('/confirmation', { templateUrl: 'partials/Confirmation.html', controller: 'ApplicationController' })
        .otherwise({ redirectTo: '' });
}]);
