/**
 * Created by osmolyar on 9/19/2019.
 */


class analyticsBusinessOptions {

//add some generic utilities here as wrappers to Webdriverio  functions

    public static initializeContext() {

        context.loginBusinessOptions = {
            login: '_SYSTEM',
            password: 'SYS'
        };

        context.cubeBusinessOptions ={
            cube: "true",
            subjectArea: "",
            name:"",
            displayName:"",
            classSourceRadio:"",
            cubeSourceRadio:"",
            baseCube:"",
            filter:"",
            sourceClass:"",
            cubeCreated:"true"
        };

        // context.SettingsGeneralOptions = {
        //     GeneralColorScheme: "Simple",
        //     ChartSeriesColorScheme :"Default",
        //     HomePageTitle :"",
        //     CompanyName  :"",
        //     CompanyLogo  :"",
        //     CompanyLink  :"",
        //     GoogleMapsApiKey :"",
        //     DefaultResource  :"",
        //
        //     DashboardEmail :"Disabled",
        //     NoDashboardTitles :false,
        //     NoDashboardBorders :false,
        //     ShowCalculatedMembersInFilters:false,
        //     AutosaveAnalyzer :false,
        //     AutosaveUserPortalSettings:false,
        // };
        //
        // context.SettingsWorklistsOptions = {
        //     CustomizedWorklists: false,
        //     HomePageTopPanelFavorites :false,
        //     HomePageTopPanelRecentItems :false,
        //     HomePageTopPanelAlertList  :false,
        //     HomePageTopPanelDetails  :false,
        //     HomePageBottomPanelFavorites :false,
        //     HomePageBottomPanelRecentItems :false,
        //     HomePageBottomPanelAlertList  :false,
        //     HomePageBottomPanelDetails :false,
        //     DashboardPageTopPanelFilters :false,
        //     DashboardPageTopPanelFavorites :false,
        //     DashboardPageTopPanelRecentItems:false,
        //     DashboardPageTopPanelAlertList :false,
        //     DashboardPageTopPanelDetails:false,
        //     DashboardPageBottomPanelFavorites:false,
        //     DashboardPageBottomPanelRecentItems:false,
        //     DashboardPageBottomPanelAlertList:false,
        //     DashboardPageBottomPanelDetails:false
        // };
        //
        // context.SettingsRunTimeVariablesOptions = {
        //     Name: "",
        //     Value: "",
        //     Context: "",
        //     Comment: ""
        // };
        //
        // context.SettingsUserDefinedIconsOptions = {
        //     Name: "",
        //     Path: ""
        // };
        //
        context.settingsValidationOptions = {
            responseText: '',
            alertText: ''
        };
        context.architectValidationOptions = {
            responseText: '',
            alertText: ''
        };
        context.hierarchyBusinessOptions = {
            name: 'H1'
        };
        context.elementBusinessOptions = {
        };
    }
}

export default analyticsBusinessOptions;