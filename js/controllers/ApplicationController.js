/**
 * Created by hchen on 11/3/2014.
 */

app.controller("ApplicationController",['$scope','$http','$q','ApplicationService','CodeTableLoaderService',
    function($scope,$http,$q,ApplicationService,CodeTableLoaderService){

        $scope.Navigation = {
            HomePage: function(){
                $scope.init();
                window.location = '#/';
            },
            SignaturePage: function(){
                window.location = '#/signature';
            },
            ProviderPage: function(){
                window.location = '#/provider';
            },
            PractitionerPage: function(moveForward){
                if ($scope.Application.Provider.IsOpticalStore())
                {
                    if (moveForward)
                        window.location = '#/corporateContact';
                    else
                        window.location = '#/provider';
                }
                else
                {
                    window.location = '#/practitioners';
                }

            },
            CorporateContactPage: function(){
                window.location = '#/corporateContact';
            },
            SummaryPage: function(){
                if ($scope.Application.Provider.IsOpticalStore())
                {
                    $scope.Application.Practitioners = [];
                }
                else
                {
                    $scope.Application.Provider.BusinessLicense.Number = '';
                    $scope.Application.Provider.BusinessLicense.EffectiveDate = new Date();
                }
                window.location = '#/summary';
            },
            ConfirmationPage: function(){

                //submit the application now, might be very quick, so better to have a delay
                $scope.SubmitApplication().then(function(){
                    window.location = '#/confirmation';
                });

            }
        }


        $scope.init = function(){

            console.log('AppController Init()');

            $scope.ShowLoadingAnimation = false;

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

            CodeTableLoaderService.getCodeTableByType('Title').then(function(data){
                $scope.TitleList = data;
            });

            $scope.CurrentPractitioner = null;

            $scope.PhoneRegex = '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$';
            $scope.EmailRegex = '^([0-9a-zA-Z]([\\+\\-_\\.][0-9a-zA-Z]+)*)+@(([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]*\\.)+[a-zA-Z0-9]{2,3})$';
            $scope.PostCodeRegex = '^([a-zA-Z]\\d[a-zA-z]\\s{1}?\\d[a-zA-Z]\\d)$';

            $scope.ConsentIsChecked = false;
            $scope.DocumentID = null;
            $scope.SubmittedDateTime = null;
            $scope.SubmissionErrors = null;

        }

        $scope.init();

        $scope.SubmitApplication = function()
        {

            var deferred = $q.defer();

            $scope.ShowLoadingAnimation = true;

            if ($scope.DocumentID != null && $scope.DocumentID.length > 0 &&
                $scope.SubmittedDateTime != null && $scope.SubmissionErrors == null)
            {
                //already submitted
                console.log('Application is already submitted, skip submission now.');
            }
            else
            {
                console.log('Application has not been submitted before, submitting it now.');

                $scope.SubmittedDateTime = new Date();

                var url = 'http://hchenworkpc.pbchbs.com/ProviderRegistration/api/codetable';

                var PostOptions = {
                    method: 'POST',
                    headers:{ 'Content-Type': 'application/json'},
                    url: url,
                    data: $scope.Application
                }

                // Simple POST request example (passing data) :
                $http(PostOptions).
                    success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
//                    alert(status);
//                    alert(data);
                        $scope.DocumentID = data;
                        deferred.resolve(data);
                    }).
                    error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        //alert(status);
                        //alert(data);
                        $scope.DocumentID = null;
                        $scope.SubmittedDateTime = null;
                        $scope.SubmissionErrors = data;
                        deferred.resolve(data);
                    }).
                    finally(function(){
                        $scope.ShowLoadingAnimation = false;
                    });
            }

            return deferred.promise;

        }

        $scope.SetNewPractitionerToCurrent = function(){
            $scope.CurrentPractitioner = ApplicationService.getEmptyPractitioner();
            console.log($scope.CurrentPractitioner);
        }

        $scope.SavePractitioner = function(practitioner){

//            var fullName = practitioner.Person.FirstName + ' ' + practitioner.Person.LastName;
//            var category = practitioner.Category.Description;
//            var email = practitioner.Email ;
//            var messageBody = category + ': ' + fullName + ' (' + email + ')';


            var isNew = true;
            for(var i=0; i<=$scope.Application.Practitioners.length-1; i++)
            {
                if($scope.Application.Practitioners[i].Guid == practitioner.Guid)
                {
                    isNew = false;
                    var newPract = {};
                    jQuery.extend(newPract, practitioner);
                    $scope.Application.Practitioners[i] = newPract;
//                    swal('Saved!', messageBody, 'success');
                }
            }

            if (isNew)
            {
                console.log('Found New: ' + isNew);
                var newPract = {};
                jQuery.extend(newPract, practitioner);
                $scope.Application.Practitioners.push(newPract);
//                swal('Added', messageBody, 'success');
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

            //$scope.SetNewPractitionerToCurrent();

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
//                swal('Deleted!!', 'You have removed a practitioner!', 'success');
                $scope.CurrentPractitioner = null;
                return true;
            }

            return false;

        }

        $scope.SetSignatureEmailToCorporateContact = function()
        {
            if($scope.Application.CorporateContact.UseSignatureEmail == true)
                $scope.Application.CorporateContact.Email = $scope.Application.Signature.Email;
            else
                $scope.Application.CorporateContact.Email = '';
        }

        $scope.ToggleConsentStatus = function(){
            $scope.ConsentIsChecked = $scope.ConsentIsChecked? false : true;
        }

    }]
);