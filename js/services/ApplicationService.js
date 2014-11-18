/**
 * Created by hchen on 11/4/2014.
 */
app.service('CodeTableLoaderService', ['$http','$q',function($http,$q){

    var GetCodeTableByType = function(codeTableType){

        var deferred = $q.defer();

        var codeTable = [];

        var url = "http://hchenworkpc.pbchbs.com/ProviderRegistration/api/codetable/" + codeTableType;
        console.log('URL: ' + url.toString());

        $http.get(url)
            .success(function(data){
                codeTable = data;
                deferred.resolve(codeTable);
            });

        return deferred.promise;
    }

    return { getCodeTableByType: GetCodeTableByType };

}]);

app.service('CorporateContactService', function(){

    var CorporateContact = {
        Person: {
            title: '',
            firstName: '',
            middleName: '',
            lastName: ''
        },
        Phone: '',
        Email: '',
        PrintAll: function () {
            console.log('Print All for: CorporateContact');
            console.log('Person: ' + this.Person);
            console.log('Phone: ' + this.Phone);
            console.log('Email: ' + this.Email);
        }
    };

    var GetCorporateContact = function(){
        return CorporateContact;
    }

    return { getCorporateContact: GetCorporateContact };

});

app.service('PractitionerService', function(){


    var Practitioner = {
        Guid: '',
        Category: { nodeId: -1, name: ''},
        AssigningAuthority: { nodeId: -1, name: ''},
        EffectiveDateAtLocation: new Date(),
        RegistrationNumber: '',
        EffectiveDateOfRegistration: new Date(),
        Person: {
            title: '',
            firstName: '',
            middleName: '',
            lastName: ''
        },
        Email: '',
        PrintAll: function(){
            console.log('Print All for: Practitioner');
            console.log('Guid: ' + this.Guid);
            console.log('Category: ' + this.Category);
            console.log('AssigningAuthority: ' + this.AssigningAuthority);
            console.log('EffectiveDateAtLocation: ' + this.EffectiveDateAtLocation);
            console.log('RegistrationNumber: ' + this.RegistrationNumber);
            console.log('EffectiveDateOfRegistration: ' + this.EffectiveDateOfRegistration);
            console.log('Person: ' + this.Person);
            console.log('Email: ' + this.Email);
        }
    };

    var GetPractitioner = function(){
        return Practitioner;
    }

    return { getPractitioner: GetPractitioner };

});

app.service('ProviderService', function(){

    var Provider = {
        Category: { nodeId: 5005, name: 'Chiropractic'},
        LegalName: 'Test Legal Name',
        Address: {
            line1: '',
            line2: '',
            line3: '',
            city: '',
            province: { nodeId: 2, name: 'British Columbia'},
            postalCode: '',
            country: { nodeId: 1, name: 'Canada' }
        },
        Phone: '',
        Fax: '',
        Email: '',
        BusinessLicense: { number: '', effectiveDate: new Date() },
        IsOpticalStore: function(){
            return this.Category.nodeId === 5011;
        },
        PrintAll: function(){
            console.log('Print All for: Provider');
            console.log('Category: ' + this.Category);
            console.log('IsOpticalStore: ' + this.IsOpticalStore());
            console.log('LegalName: ' + this.LegalName);
            console.log('Address: ' + this.Address);
            console.log('Phone: ' + this.Phone);
            console.log('Fax: ' + this.Fax);
            console.log('Email: ' + this.Email);
            console.log('Business License: ' + this.BusinessLicense);
        }
    };

    var GetProvider = function(){
        return Provider;
    }
    return { getProvider: GetProvider };

});

app.service('SignatureService', function(){

    var Signature = {
        AppDate: new Date(),
        WhoYouAre: 'I am the Provider',
        Name: 'Hejun Chen',
        OccupationTitle: '',
        Phone: '',
        Email: '',
        PrintAll: function(){
            console.log('Print All for: Signature');
            console.log('AppDate: ' + this.AppDate);
            console.log('WhoYouAre: ' + this.WhoYouAre);
            console.log('Name: ' + this.Name);
            console.log('OccupationTitle: ' + this.OccupationTitle);
            console.log('Phone: ' + this.Phone);
            console.log('Email: ' + this.Email);
        }
    };

    var GetSignature = function(){
        return Signature;
    }

    return { getSignature: GetSignature };

});

app.service('ApplicationService', ['SignatureService','ProviderService','PractitionerService','CorporateContactService',
    function(SignatureService,ProviderService,PractitionerService,CorporateContactService){

        var Application = {
            Signature: SignatureService.getSignature(),
            Provider: ProviderService.getProvider(),
            Practitioners: [],
            CorporateContact: CorporateContactService.getCorporateContact(),
            PrintAll: function(){
                this.Signature.PrintAll();
                this.Provider.PrintAll();
                this.CorporateContact.PrintAll();
            }
        }


        var GetApplication = function(){
            return Application;
        }

        var GetEmptyPractitioner = function(){
            return new PractitionerService.getPractitioner();
        }

        var DeletePractitioner = function(practitioner){
            this.Application.Practitioners.remove(practitioner);
        }

        var AddPractitioner = function(practitioner){
            this.Application.Practitioners.push(practitioner);
        }

        var SavePractitioner = function(practitioner){

            var isNew = false;
            for(var i=0; i<=this.Application.Practitioners.length-1; i++)
            {
                if(this.Application.Practitioners[i].Guid == practitioner.Guid)
                {
                    isNew = true;
                    this.Application.Practitioners[i] = practitioner;
                }
            }

            console.log('Found New: ' + isNew);

            if (!isNew)
            {
                AddPractitioner(practitioner);
            }

        }

        return {
            getApplication: GetApplication,
            getEmptyPractitioner: GetEmptyPractitioner,
            deletePractitioner: DeletePractitioner,
            addPractitioner: AddPractitioner,
            savePractitioner: SavePractitioner
        };

}]);


