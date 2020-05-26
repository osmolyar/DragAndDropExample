/**
 * Created by osmolyar on 11/6/2017.
 */
import speed from "../config/speed";

class GenericUtilities {
    // add some generic utilities here as wrappers to Webdriverio  functions

    static lowercaseFirstLetter(string: string) {
        return string.charAt(0).toLowerCase() + string.slice(1)
    }

    static timeStamp() {
        return new Date().getTime()
    }

    static addTimestamp(name: string) {
        return name + "_" + this.timeStamp()
    }

    static addNoUnderscoreTimestamp(name: string) {
        var timestampUserName = name + this.timeStamp()
        return timestampUserName
    }

    // Can be used to load jQuery into a page, allowing jQuery commands to be executed as follows:
    // GenericUtilities.injectJQuery();
    // browser.execute(`jQuery(document.getElementById('frame_15').getSVGDocument().querySelector("#tabBar > g:nth-child(10) > text")).click()`);

    static injectJQuery() {
        browser.execute(`function l(u, i)
        {   var d = document;
            if (!d.getElementById(i))
            {
                var s = d.createElement('script');
                s.src = u;
                s.id = i;
                d.body.appendChild(s);
             }
         } l('//code.jquery.com/jquery-3.2.1.min.js', 'jquery')`)
        browser.pause(1000)
    }

    static getRowId(selector: string, text: string) {
        const rows = $$(selector)
        return rows.findIndex(row => row.getText().includes(text))
    }
}

export default GenericUtilities
