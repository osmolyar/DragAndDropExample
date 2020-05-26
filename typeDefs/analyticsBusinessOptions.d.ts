interface Context {
    // business options
    settingsGeneralOptions: SettingsGeneralOptions;
    settingsRunTimeVariableOptions: SettingsRunTimeVariableOptions;
    settingsUserDefinedIconOptions: SettingsUserDefinedIconOptions;
    settingsWorklistOptions: SettingsWorklistOptions;
    settingsValidationOptions: SettingsValidationOptions;
    cubeBusinessOptions: CubeBusinessOptions;
    elementBusinessOptions: ElementBusinessOptions;
    architectValidationOptions: ArchitectValidationOptions;
    levelBusinessOptions: LevelBusinessOptions;
    measureBusinessOptions: MeasureBusinessOptions;
    dimensionBusinessOptions: DimensionBusinessOptions;
    relationshipBusinessOptions: RelationshipBusinessOptions;
    listingBusinessOptions: ListingBusinessOptions;
    propertyBusinessOptions: PropertyBusinessOptions;
    expressionBusinessOptions: ExpressionBusinessOptions;
    calculatedMemberBusinessOptions: CalculatedMemberBusinessOptions;
    hierarchyBusinessOptions: HierarchyBusinessOptions;
    listingFieldBusinessOptions: ListingFieldBusinessOptions;
    namedSetBusinessOptions: NamedSetBusinessOptions;
}


type SettingsGeneralOptions = {
    GeneralColorScheme?: string,
    ChartSeriesColorScheme?: string,
    HomePageTitle?: string,
    CompanyName?: string,
    CompanyLogo?: string,
    CompanyLink?: string,
    GoogleMapsApiKey?: string,
    DefaultResource?: string,
    DashboardEmail?: string,
    NoDashboardTitles?: string,
    NoDashboardBorders?: string,
    ShowCalculatedMembersInFilters?: string,
    AutosaveAnalyzer?: string,
    AutosaveUserPortalSettings?: string,
};

type SettingsWorklistOptions = {
    CustomizedWorklists?: string,
    HomePageTopPanelFavorites?: string,
    HomePageTopPanelRecentItems?: string,
    HomePageTopPanelAlertList?: string,
    HomePageTopPanelDetails?: string,
    HomePageBottomPanelFavorites?: string,
    HomePageBottomPanelRecentItems?: string,
    HomePageBottomPanelAlertList?: string,
    HomePageBottomPanelDetails?: string,
    DashboardPageTopPanelFilters?: string,
    DashboardPageTopPanelFavorites?: string,
    DashboardPageTopPanelRecentItems?: string,
    DashboardPageTopPanelAlertList?: string,
    DashboardPageTopPanelDetails?: string,
    DashboardPageBottomPanelFavorites?: string,
    DashboardPageBottomPanelRecentItems?: string,
    DashboardPageBottomPanelAlertList?: string,
    DashboardPageBottomPanelDetails?: string,
};

type SettingsRunTimeVariableOptions = {
    ItemName?: string,
    ItemValue?: string,
    ItemContext?: string,
    ItemComment?: string,
};

type SettingsUserDefinedIconOptions = {
    IconName?: string,
    IconPath?: string,
};

type SettingsValidationOptions = {
    alertText?: string
};

type CubeBusinessOptions = {
     cube?: string,
     subjectArea?: string,
     name?: string,
     displayName?: string,
     classSourceRadio?: string,
     cubeSourceRadio?: string,
     baseCube?: string,
     filter?: string,
     sourceClass?: string,
     className?: string,
     classDescription?: string,
     cubeCreated?: string,
};

type ElementBusinessOptions = {
     name               ?: string,
     elementType        ?: string,
     measure            ?: string,
     dataDimension      ?: string,
     timeDimension      ?: string,
     ageDimension       ?: string,
     iKnowDimension     ?: string,
     sharedDimension    ?: string, 
     hierarchy          ?: string,
     level              ?: string, 
     property           ?: string, 
     listing            ?: string, 
     listingField       ?: string, 
     calculatedMemberMeasure ?: string,
     calculatedMemberDimension ?: string,
     namedSet           ?: string, 
     relationship       ?: string, 
     expression         ?: string, 
     cubeCreated        ?: string,
};

type LevelBusinessOptions = {
    name: string,
    disabled?: string,
    displayName?: string,
    description?: string,
    propertyRadio?: string,
    expressionRadio?: string,
    sourceProperty?: string,
    sourceExpression?: string,
    nullReplacementString?: string,
    rangeExpression?: string,
    useDisplayValue?: string,
    sourceValueListType?: string,
    listDelimiter?: string,
    timeFormat?: string,
    sortOption?: string,
    fieldNameInFactTable?: string,
    dependsOn?: string,
    additionalDescription?: string,
    elementType        ?: string,
}

type MeasureBusinessOptions = {
    name: string,
    disabled?: string,
    hidden?: string,
    searchable?: string,
    displayName?: string,
    description?: string,
    propertyRadio?: string,
    expressionRadio?: string,
    property?: string,
    expression?: string,
    aggregate?: string,
    type: string,
    precision?: string,
    formatString?: string,
    fieldNameInFactTable?: string,
    operator?: string,
    value?: string,
    additionalDescription?: string,
    elementType        ?: string,
}

type DimensionBusinessOptions = {
    name: string,
    disabled?: string,
    dimensionType?: string,
    enableAllLevel?: string,
    captionForAllMember?: string
    displayNameForAllMember?: string,
    displayName?: string,
    description?: string,
    propertyRadio?: string,
    expressionRadio?: string,
    property?: string,
    expression?: string,
    calendar?: string,
    iKnowType: string,
    iKnowMeasure?: string,
    additionalDescription?: string,
    elementType        ?: string,
}

type PropertyBusinessOptions = {
    name: string,
    disabled?: string,
    hidden?: string,
    displayName?: string,
    description?: string,
    propertyRadio?: string,
    expressionRadio?: string,
    sourceProperty?: string,
    sourceExpression?: string,
    nullReplacementString?: string,
    rangeExpression?: string,
    useDisplayValue: string,
    sourceValueListType?: string,
    listDelimiter?: string,
    fieldNameInFactTable?: string,
    extractValueWithFunction?: string,
    timeFormat?: string,
    sortMembersByPropertyValue?: string,
    getValueAtRuntime?: string,
    useAsMemberNames?: string,
    dependsOn?: string,
    additionalDescription?: string,
    elementType        ?: string,
}

type RelationshipBusinessOptions = {
    name: string,
    disabled?: string,
    displayName?: string,
    description?: string,
    propertyRadio?: string,
    expressionRadio?: string,
    property?: string,
    expression?: string,
    nullReplacementString?: string,
    cardinality?: string,
    inverse: string,
    relatedCube?: string,
    fieldNameInFactTable?: string,
    additionalDescription?: string,
    elementType        ?: string,
}

type ListingBusinessOptions = {
    name: string,
    disabled?: string,
    displayName?: string,
    description?: string,
    type?: string,
    resource?: string,
    fieldList?: string,
    orderBy?: string,
    dataConnector?: string,
    customSQLQuery?: string,
    SQLQuery: string,
    additionalDescription?: string,
    elementType        ?: string,
}

type CalculatedMemberBusinessOptions = {
    name: string,
    disabled?: string,
    displayName?: string,
    description?: string,
    formatString?: string,
    valueExpression?: string,
    listingFilter?: string,
    additionalDescription?: string,
    elementType        ?: string,
}

type ExpressionBusinessOptions = {
    name: string,
    disabled?: string,
    displayName?: string,
    description?: string,
    sourceExpression?: string,
    additionalDescription?: string,
    elementType        ?: string,
}

type HierarchyBusinessOptions = {
    name: string,
    disabled?: string,
    displayName?: string,
    description?: string,
    additionalDescription?: string,
    elementType        ?: string,
}

type ListingFieldBusinessOptions = {
    name: string,
    disabled?: string,
    displayName?: string,
    description?: string,
    fieldExpression?: string,
    resource?: string,
    elementType        ?: string,
}

type NamedSetBusinessOptions = {
    name: string,
    disabled?: string,
    displayName?: string,
    description?: string,
    setExpression?: string,
    resource?: string,
    elementType        ?: string,
}

type ArchitectValidationOptions = {
    cubeCreated?: string,
    alertText?: string,
    responseText?: string
};



