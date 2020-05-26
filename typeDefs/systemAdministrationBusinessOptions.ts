interface Context {
    // business options
    loginBusinessOptions: LoginBusinessOptions;
    userBusinessOptions: UserBusinessOptions;
    userExpectedValidationOptions: UserValidationOptions;
    userValidationOptions: UserValidationOptions;
    editedUserBusinessOptions: EditedUserBusinessOptions;
    roleBusinessOptions: RoleBusinessOptions;
    editedRoleBusinessOptions: EditedRoleBusinessOptions;
    navigationValidationOptions: NavigationValidationOptions;
    navigationBusinessOptions: NavigationBusinessOptions;
    licenseBusinessOptions: LicenseBusinessOptions;
    resourceBusinessOptions: ResourceBusinessOptions;
    databaseBusinessOptions: DatabaseBusinessOptions;
    editedDatabaseBusinessOptions: EditedDatabaseBusinessOptions;
    globalsDatabaseBusinessOptions: GlobalsDatabaseBusinessOptions;
    routinesDatabaseBusinessOptions: RoutinesDatabaseBusinessOptions;
    namespaceBusinessOptions: NamespaceBusinessOptions;
    editedNamespaceBusinessOptions: EditedNamespaceBusinessOptions;
    namespaceMappingOptions: NamespaceMappingOptions;
    namespaceValidationOptions: NamespaceValidationOptions;
    namespaceExpectedValidationOptions: NamespaceValidationOptions;
    databaseValidationOptions: DatabaseValidationOptions;
    expectedDatabaseValidationOptions: DatabaseValidationOptions;
    roleValidationOptions: RoleValidationOptions;
    roleExpectedValidationOptions: RoleValidationOptions;
    resourceValidationOptions: ResourceValidationOptions;
    resourceExpectedValidationOptions: ResourceValidationOptions;
    webApplicationBusinessOptions: WebApplicationBusinessOptions;
    webApplicationValidationOptions: WebApplicationValidationOptions;
    authenticationWebSessionOptions: AuthenticationWebSessionOptions;
    authenticationValidationOptions: AuthenticationValidationOptions;
    systemWideSecurityParametersOptions: SystemWideSecurityParametersOptions;
    systemWideSecurityParametersValidationOptions: SystemWideSecurityParametersValidationOptions;
    expectedSystemWideSecurityOptions: SystemWideSecurityParametersValidationOptions
}

type LoginBusinessOptions = {
    login:string,
    password: string
};

type UserBusinessOptions= {
    login: string,
    passwd: string,
    passwdConfirm: string,
    fullName?: string,
    comment?: string,
    chgPasswdNextLogin?: string,
    passwdNeverExpires?: string,
    userEnabled?: string,
    expDate?: string,
    acctNeverExpires?: string,
    startupNamespace?: string,
    emailAddress?: string,
    mobilePhoneServiceProvider?: string,
    mobilePhoneNumber?: string,
    exists?: string,
    role?: string,
    privilege?: string,
    table?: string,
    view?: string,
    schema?: string,
    column?: string,
    procedure?: string,
    grantOption?: string,
    newSQLPrivileges?: string,
    newSQLTables?: string,
    newSQLColumns?: string,
    newSQLTablePermissions?: string,
    newSQLColumnPermissions?: string,
    newSQLViews?: string,
    newSQLViewPermissions?: string,
    newSQLProcedures?: string,
    newSQLProcedurePermissions?: string,
}

type EditedUserBusinessOptions= {
    passwd?: string,
    passwdConfirm?: string,
    fullName?: string,
    comment?: string,
    chgPasswdNextLogin?: string,
    passwdNeverExpires?: string,
    userEnabled?: string,
    expDate?: string,
    acctNeverExpires?: string,
    startupNamespace?: string,
    emailAddress?: string,
    mobilePhoneServiceProvider?: string,
    mobilePhoneNumber?: string,
    exists?: string,
    role?: string,
    privilege?: string,
    table?: string,
    view?: string,
    schema?: string,
    column?: string,
    procedure?: string,
    grantOption?: string,
    newSQLPrivileges?: string,
    newSQLTables?: string,
    newSQLColumns?: string,
    newSQLTablePermissions?: string,
    newSQLColumnPermissions?: string,
    newSQLViews?: string,
    newSQLViewPermissions?: string,
    newSQLProcedures?: string,
    newSQLProcedurePermissions?: string,
};

type RoleBusinessOptions= {
    name: string,
    memberOfRole?: string,
    memberOfUser?: string,
    assignedToRole?: string,
    description?: string,
    permissions?: string,
    privilege?: string,
    resource?: string,
    newResources?: Array<any>,
    table?: string,
    view?: string,
    procedure?: string,
    grantOption?: string,
    schema?: string,
    column?: string,
    exists?: string,
    newSQLPrivileges?: string,
    newSQLTables?: string,
    newSQLViews?: string,
    newSQLColumns?: string,
    newSQLTablePermissions?: string,
    newSQLColumnPermissions?: string,
    newSQLViewPermissions?: string,
    newSQLProcedures?: string,
    newSQLProcedurePermissions?: string,
};

type NavigationBusinessOptions = {
    click1?: string,
    click2?: string,
    click3?: string,
    click4?: string,
    access?: string,
};

type NavigationValidationOptions = {
    pathEnabled?: string,
};

type LicenseBusinessOptions = {
    filepath:string,
};

type ResourceBusinessOptions = {
    name:string,
    description?: string,
    permissions?: string,
    exists?: string,
    resources?: string,
    exportPath?: string,
    importPath?: string,
};

type EditedDatabaseBusinessOptions = {
    name?: string,
    currentSize?: string,
    expansionSize?: string,
    maximumSize?: string,
    resourceName?: string,
    newGlobalCollation?: string,
    newGlobalGrowthBlock?: string,
    newGlobalPointerBlock?: string,
    globalJournalState?: string,
    preserveGlobalAttributesOnDelete?: string,
    mountReadOnly?: string,
    mountRequiredAtStartup?: string,
    streamLocation?: string,
};

type DatabaseBusinessOptions = {
    name:string,
    directory?: string,
    initialSize?: string,
    blockSize?: string,
    journalGlobals?: string,
    encryptDatabase?: string,
    newResource?: string,
    resourceName?: string,
    resourceDescription?: string,
    resourcePermissions?: string,
};

type GlobalsDatabaseBusinessOptions = {
    name:string,
    directory?: string,
    initialSize?: string,
    blockSize?: string,
    journalGlobals?: string,
    encryptDatabase?: string,
    newResource?: string,
    resourceName?: string,
    resourceDescription?: string,
    resourcePermissions?: string,
};

type RoutinesDatabaseBusinessOptions = {
    name:string,
    directory?: string,
    initialSize?: string,
    blockSize?: string,
    journalGlobals?: string,
    encryptDatabase?: string,
    newResource?: string,
    resourceName?: string,
    resourceDescription?: string,
    resourcePermissions?: string,
};

type NamespaceBusinessOptions = {
    namespace:string,
    globalsDatabase?: string,
    routinesDatabase?: string,
    newGlobalsDatabase:string,
    newRoutinesDatabase?: string,
    copyFrom?: string,
    defaultGlobalsRemote?: string,
    defaultRoutinesRemote?: string,
    copyNamespaceMappingsFrom?: string,
    productionEnabled?: string,
    globalsDatabaseDirectory?: string,
    routinesDatabaseDirectory?: string,
};

type NamespaceMappingOptions = {
    globalDatabaseLocation?: string,
    globalName?: string,
    globalSubscripts?: string,
    collation?: string,
    lockDatabaseLocation?: string,
    routineDatabaseLocation?: string,
    routineName?: string,
    packageDatabaseLocation?: string,
    packageName?: string,
    newGlobalName?: string,
    newRoutineName?: string,
    newPackageName?: string,
    editLinkName?: string
};

type EditedNamespaceBusinessOptions = {
    namespace:string,
    globalsDatabase?: string,
    routinesDatabase?: string,
    tempStorageDatabase?: string,
};

type UserValidationOptions = {
    responseText?: string,
    nameHintRed?: string,
    passwdHintRed?: string,
    passwdConfirmHintRed?: string,
    routineHint?: string,
    namespaceHint?: string,
}

type DatabaseValidationOptions = {
    databaseError?: string,
    resourceError?: string,
    resourceHintHighlighted?: string,
    resourceCreated?: string,
    resourceAlertError?: string,
    responseText?: string,
    globalJournalStateWarning?: string,
    editGlobalResponse?: string,
    editDBAlertError?: string,
    globalEdited?: string,
    databaseHintHighlighted?: string
};

type NamespaceValidationOptions = {
    responseText?: string,
    namespaceHintHighlighted?: string,
    databaseHintHighlighted?: string,
    globalMappingEdited?: string,
    routineMappingEdited?: string,
    packageMappingEdited?: string,
    databaseError?: string,
    editMappingError?: string,
    deleteMappingError?: string,
    resourceError?: string,
    resourceHintHighlighted?: string,
    resourceCreated?: string,
    resourceAlertError?: string,
};

type ResourceValidationOptions = {
    responseText?: string,
    nameHintHighlighted?: string,

};

type RoleValidationOptions = {
    responseText?: string,
    nameHintHighlighted?: string,
    sourcePrivileges?: Array<any>,
    targetPrivileges?: Array<any>,
    resourceList?: Array<any>,
    permissionsList?: Array<any>,
    permissions?: string,
    resource?: string,
    leftNavLinksEnabled?: Array<any>
};
type EditedRoleBusinessOptions = {
    newResources?: string,
};

type WebApplicationBusinessOptions = {
    name?: string,
    description?: string,
    namespace?: string,
    namespaceDefaultApplication?: string,
    enableApplication?: string,
    enableREST?: string,
    dispatchClass?: string,
    enableCSPZEN?: string,
    enableAnalytics?: string,
    enableInboundWebServices?: string,
    preventLoginCSRFAttack?: string,
    resourceRequired?: string,
    groupById?: string,
    unauthenticated?: string,
    password?: string,
    kerberos?: string,
    loginCookie?: string,
    sessionTimeout?: string,
    eventClass?: string,
    useCookieForSession?: string,
    sessionCookiePath?: string,
    serveFiles?: string,
    serveFilesTimeout?: string,
    physicalPath?: string,
    packageName?: string,
    defaultSuperclass?: string,
    recurse?: string,
    autoCompile?: string,
    lockCSPName?: string,
    loginPage?: string,
    changePasswordPage?: string,
    customErrorPage?: string
};

type WebApplicationValidationOptions = {
    nameHintHighlighted?: string,
    dispatchClassHintHighlighted?: string,
    responseText?: string
};

type AuthenticationWebSessionOptions = {
    AllowUnauthenticatedAccess?: string,
    AllowOperatingSystemAuthentication?: string,
    AllowOperatingSystemDelegatedAuthentication?: string,
    AllowOperatingSystemLDAPAuthorization?: string,
    AllowPasswordAuthentication?: string,
    AllowDelegatedAuthentication?: string,
    AllowKerberosAuthentication?: string,
    AllowLDAPAuthentication?: string,
    AllowLDAPCacheCredentialsAuthentication?: string,
    AllowCreationOfLoginCookies?: string,
    LoginCookieExpireTime?: string,
    AllowTwoFactorTimeBasedOneTimePasswordAuthentication?: string,
    AllowTwoFactorSMSTextAuthentication?: string,
    TwoFactorTimeBasedOneTimePasswordIssuer?: string,
    TwoFactorTimeout?: string,
    DNSNameOfSMTPServer?: string,
    FromAddress?: string,
    SMTPUsername?: string,
    EnterNewPassword?: string,
    ClearPassword?: string,
    LeaveAsIs?: string,
    SMTPPassword?: string,
    SMTPPasswordConfirm?: string,
    valid?: string
};

type AuthenticationValidationOptions = {
    responseText?: string,
    DNSNameHintHighlighted?: string,
    FromAddressHintHighlighted?: string,
};

type SystemWideSecurityParametersOptions = {
    EnableAudit?: string,
    EnableConfigurationSecurity?: string,
    FreezeSystemOnAuditDatabaseError?: string,
    DefaultSecurityDomain?: string,
    InactiveLimit?: string,
    InvalidLoginLimit?: string,
    DisableAccountIfLoginLimitReached?: string,
    PasswordExpirationDays?: string,
    PasswordPattern?: string,
    PasswordValidationRoutine?: string,
    RoleRequiredToConnectToThisSystem?: string,
    EnableWritingToPercentGlobals?: string,
    AllowMultipleSecurityDomains?: string,
    SuperServerSSLDisabled?: string,
    SuperServerSSLEnabled?: string,
    SuperServerSSLRequired?: string,
    DefaultSignatureHash?: string
    valid?: string
};

type SystemWideSecurityParametersValidationOptions = {
    responseText?: string,
    SuperServerSSLWarning?: string,
    InvalidLoginLimitHint?: string,
    InactiveLimitHint?: string,
    PasswordExpirationDaysHint?: string,
    InvalidLoginLimitHintHighlighted?: string,
    InactiveLimitHintHighlighted?: string,
    PasswordExpirationDaysHintHighlighted?: string,
};




