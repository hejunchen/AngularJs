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
            Title: { CodeItemId: -1, CodeType: '', Description: '', LanguageId: 1, LevelNo: 1, Mnemonic: '', NodeId: -1, ParentLevelNo: -1, ParentNodeId: -1},
            FirstName: '',
            MiddleName: '',
            LastName: ''
        },
        Phone: '',
        Email: 'CorpCon@pac.com',
        UseSignatureEmail: false,
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

    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    function NewGuid(){
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }

    var Practitioner = {};
    var Init = function(){
        Practitioner.Guid = NewGuid();
        Practitioner.SeqNum = -1;
        Practitioner.Category = { CodeItemId: -1, CodeType: '', Description: '', LanguageId: 1, LevelNo: 1, Mnemonic: '', NodeId: -1, ParentLevelNo: -1, ParentNodeId: -1};
        Practitioner.AssigningAuthority = { CodeItemId: -1, CodeType: '', Description: '', LanguageId: 1, LevelNo: 1, Mnemonic: '', NodeId: -1, ParentLevelNo: -1, ParentNodeId: -1};
        Practitioner.EffectiveDateAtLocation = new Date();
        Practitioner.RegistrationNumber = '';
        Practitioner.EffectiveDateOfRegistration = new Date();
        Practitioner.Person = {
            Title: { CodeItemId: -1, CodeType: '', Description: '', LanguageId: 1, LevelNo: 1, Mnemonic: '', NodeId: -1, ParentLevelNo: -1, ParentNodeId: -1},
            FirstName: '',
            MiddleName: '',
            LastName: ''};
        Practitioner.Email = '';
        PrintAll = function(){
            console.log('Print All for: Practitioner');
            console.log('Guid: ' + this.Guid);
            console.log('Category: ' + this.Category);
            console.log('AssigningAuthority: ' + this.AssigningAuthority);
            console.log('EffectiveDateAtLocation: ' + this.EffectiveDateAtLocation);
            console.log('RegistrationNumber: ' + this.RegistrationNumber);
            console.log('EffectiveDateOfRegistration: ' + this.EffectiveDateOfRegistration);
            console.log('Person: ' + this.Person);
            console.log('Email: ' + this.Email);
        };
    }

    var GetPractitioner = function(){
        Init();
        return Practitioner;
    }

    return { getPractitioner: GetPractitioner };

});

app.service('ProviderService', function(){

    var Provider = {
        Category: { CodeItemId: -1, CodeType: '', Description: '', LanguageId: 1, LevelNo: 1, Mnemonic: '', NodeId: -1, ParentLevelNo: -1, ParentNodeId: -1},
        LegalName: 'Test Legal Name',
        Address: {
            Line1: '',
            Line2: '',
            Line3: '',
            City: '',
            Province: { CodeItemId: -1, CodeType: '', Description: '', LanguageId: 1, LevelNo: 1, Mnemonic: '', NodeId: -1, ParentLevelNo: -1, ParentNodeId: -1},
            PostalCode: '',
            Country: { CodeItemId: 0, CodeType: 'COUNTRY', Description: 'Canada', LanguageId: 1, LevelNo: 1, Mnemonic: 'CAN', NodeId: 1, ParentLevelNo: 0, ParentNodeId: 0}
        },
        Phone: '',
        Fax: '',
        Email: '',
        BusinessLicense: { Number: '', EffectiveDate: new Date() },
        IsOpticalStore: function(){
            var result = (this.Category.NodeId === 5011);
            return result;
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
        Email: 'signature@pac.com',
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
            return PractitionerService.getPractitioner();
        }

        return {
            getApplication: GetApplication,
            getEmptyPractitioner: GetEmptyPractitioner
        };

}]);


