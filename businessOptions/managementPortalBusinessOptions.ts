/**
 * Created by osmolyar on 11/6/2017.
 */
// let businessOptionsTypes          = require( '../typeDefs/systemAdministrationBusinessOptions.ts' );
class businessOptions {

//add some generic utilities here as wrappers to Webdriverio  functions

    public static initializeContext() {

        context.stackP = [];

        context.loginBusinessOptions = {
            login: '_SYSTEM',
            password: 'SYS'
        };
        context.licenseBusinessOptions = {
            filepath: '/tmp/ISC.cache.key'
        };
        context.licenseExpectedValidationOptions = {};
        context.licenseValidationOptions = {};
        context.userBusinessOptions = {
            login: 'name',
            passwd: 'password',
            passwdConfirm: 'password',
            exists: 'true',
        };
        context.roleBusinessOptions = {
            name: 'name',
            exists: 'true',
        };
        context.resourceBusinessOptions = {
            name: 'name',
            exists: 'true',
        };
        context.editedDatabaseBusinessOptions = {};
        context.databaseBusinessOptions = {
            name: '',
        };
        context.globalsDatabaseBusinessOptions = {
            name: '',
        };

        context.routinesDatabaseBusinessOptions = {
            name: '',
        };
        context.namespaceBusinessOptions = {
            namespace: 'namespace',
            globalsDatabase: 'USER',
            newGlobalsDatabase: '',
        };
        context.namespaceMappingOptions = {
        };
        context.editedNamespaceBusinessOptions = {
            namespace: 'namespace',
            globalsDatabase: 'USER',
        };

        context.databaseValidationOptions = {
        };
        context.namespaceValidationOptions = {
            globalMappingEdited: 'true',
            routineMappingEdited: 'true',
            packageMappingEdited: 'true',
        };
        context.namespaceExpectedValidationOptions = {
        };
        context.resourceValidationOptions = {
        };
        context.resourceExpectedValidationOptions = {
        };
        context.editedUserBusinessOptions = {};
        context.userExpectedValidationOptions = {
        };
        context.userValidationOptions = {
        };
        context.roleValidationOptions = {
            sourcePrivileges: [],
            targetPrivileges: [],
            resourceList: [],
            permissionsList: [],
            leftNavLinksEnabled: []
        };
        context.editedRoleBusinessOptions = {
        };
        context.roleExpectedValidationOptions = {
            leftNavLinksEnabled: []
        };
        context.navigationBusinessOptions = {
        };
        context.navigationValidationOptions = {
        };
        context.webApplicationBusinessOptions = {
            namespaceDefaultApplication: 'true',
            enableApplication: 'true',
            enableREST: 'false',
            enableCSPZEN: 'true',
            enableAnalytics: 'false',
            enableInboundWebServices: 'true',
            preventLoginCSRFAttack: 'false',
            unauthenticated: 'true',
            password: 'true',
            kerberos: 'false',
            loginCookie: 'false',
            recurse: 'true',
            autoCompile: 'true',
            lockCSPName: 'true',
        };
        context.webApplicationValidationOptions = {
        };
        context.authenticationWebSessionOptions = {
            valid: 'true'
        };
        context.authenticationValidationOptions = {
        };
        context.systemWideSecurityParametersOptions = {
            valid: 'true'
        };
        context.systemWideSecurityParametersValidationOptions = {
        };
    }
}

export default businessOptions;