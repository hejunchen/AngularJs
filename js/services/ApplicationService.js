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
            FirstName: 'Ying',
            MiddleName: '',
            LastName: 'Zhuang'
        },
        Phone: '604-101-1010',
        Email: 'CorpCon@pac.com',
        UseSignatureEmail: true,
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
        Practitioner.RegistrationNumber = '123456789';
        Practitioner.EffectiveDateOfRegistration = new Date();
        Practitioner.Person = {
            Title: { CodeItemId: -1, CodeType: '', Description: '', LanguageId: 1, LevelNo: 1, Mnemonic: '', NodeId: -1, ParentLevelNo: -1, ParentNodeId: -1},
            FirstName: 'Hejun',
            MiddleName: '',
            LastName: 'Chen'};
        Practitioner.Email = '604-101-1010';
        Practitioner.PrintAll = function(){
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

    var Provider = {};
    var Init = function(){
        Provider.Category = { CodeItemId: -1, CodeType: '', Description: '', LanguageId: 1, LevelNo: 1, Mnemonic: '', NodeId: -1, ParentLevelNo: -1, ParentNodeId: -1},
        Provider.LegalName = 'Test Legal Name',
        Provider.Address = {
            Line1: '123 Street',
            Line2: '',
            Line3: '',
            City: 'Burnaby',
            Province: { CodeItemId: -1, CodeType: '', Description: '', LanguageId: 1, LevelNo: 1, Mnemonic: '', NodeId: -1, ParentLevelNo: -1, ParentNodeId: -1},
            PostalCode: 'V8W 7T9',
            Country: { CodeItemId: 0, CodeType: 'COUNTRY', Description: 'Canada', LanguageId: 1, LevelNo: 1, Mnemonic: 'CAN', NodeId: 1, ParentLevelNo: 0, ParentNodeId: 0}
        },
        Provider.Phone = '604-101-1010',
        Provider.Fax = '604-101-1010',
        Provider.Email = 'testProv@test.com',
        Provider.BusinessLicense = { Number: '789456123', EffectiveDate: new Date() },
            Provider.IsOpticalStore = function(){
            var result = (this.Category.NodeId === 5011);
            return result;
        },
        Provider.IsValid = function(){
            return (this.Category.CodeItemId > -1) && (this.LegalName.length > 0) &&
                   (this.Address.Line1.length > 0) && (this.Address.City.length > 0) && (this.Address.Province.CodeItemId > -1) && (this.Address.PostalCode.length > 0) && (this.Address.Country.CodeItemId > -1) &&
                   (this.Phone.length > 0) && (this.Email.length > 0) &&
                   ((this.IsOpticalStore() == true && this.BusinessLicense.Number.length > 0) || (this.IsOpticalStore() == false));
                    },
        Provider.PrintAll = function(){
            console.log('Print All for: Provider');
            console.log('Category: ' + this.Category);
            console.log('IsOpticalStore: ' + this.IsOpticalStore());
            console.log('LegalName: ' + this.LegalName);
            console.log('Address: ' + this.Address);
            console.log('Phone: ' + this.Phone);
            console.log('Fax: ' + this.Fax);
            console.log('Email: ' + this.Email);
            console.log('Business License: ' + this.BusinessLicense);
            console.log('Is Valid: ' + this.IsValid());
        }
    };

    var GetProvider = function(){
        Init();
        return Provider;
    }
    return { getProvider: GetProvider };

});

app.service('SignatureService', function(){

    var Signature = {};
    var Init = function(){
        Signature.AppDate = new Date(),
        Signature.WhoYouAre = 'I am the Provider',
        Signature.Name = 'Hejun Chen',
        Signature.OccupationTitle = 'Developer',
        Signature.Phone = '778-123-4567',
        Signature.Email = 'signature@pac.com',
        Signature.PrintAll = function(){
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
        Init();
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


