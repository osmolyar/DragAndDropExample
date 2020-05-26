/**
 * Created by osmolyar on 11/6/2017.
 */

class utilities {

//add some generic utilities here as wrappers to Webdriverio  functions

    static lowercaseFirstLetter(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    };

    static translatePermissions(permissions) {
        var tempPermissions='';
        switch(permissions) {
            case 'R':
                tempPermissions='1';
                break;
            case 'W':
                tempPermissions='2';
                break;
            case 'RW':
                tempPermissions='3';
                break;
            case 'U':
                tempPermissions='4';
                break;
            case 'RU':
                tempPermissions='6';
                break;
            case 'UR':
                tempPermissions='6';
                break;
            case 'WU':
                tempPermissions='6';
                break;
            case 'UW':
                tempPermissions='6';
                break;
            case 'RWU':
                tempPermissions='7';
                break;
            case 'RUW':
                tempPermissions='7';
                break;
            case 'WRU':
                tempPermissions='7';
                break;
            case 'WUR':
                tempPermissions='7';
                break;
            case 'URW':
                tempPermissions='7';
                break;
            case 'UWR':
                tempPermissions='7';
                break;
        }
        return tempPermissions;
    };

}

// @ts-ignore
String.prototype.trimRight = function(charlist) : string {
    if (charlist === undefined)
        charlist = "\s";

    return this.replace(new RegExp("[" + charlist + "]+$"), "");
};


export default utilities;