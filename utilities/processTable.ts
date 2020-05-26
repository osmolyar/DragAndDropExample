import process from "process";
import { fromPairs, forEach, has, zip } from "lodash";

const defaultOptions = {
    selectors: {
        headers: "thead:first-child > tr > *",
        rows: "tbody > tr",
        rowCells: "td"
    },
    blankHeaders: [],
    altAttributes: {},
    rowNumbers: []
};

// if you want to use processTable with a faux-table, use these selectors
// for example, processTable(<whatever>, { selectors: fauxTableSelectors })
export const fauxTableSelectors = {
    headers: ".th",
    rows: ".tbody > .tr",
    rowCells: ".td"
};

/**
 * @typedef {Object} ptOptions Options for the `processTable` utility function
 * @property {Object} [selectors] The selectors for finding table elements
 * @property {string} [selectors.headers]
 * @property {string} [selectors.rows]
 * @property {string} [selectors.rowCells]
 *
 * @property {string[]} [blankHeaders] An array of strings, where each string will be assigned to a corresponding blank header
 *
 * @property {Object<string, string>} [altAttributes] An object, where each key is a header and each value is an attribute to retrieve,
 * compatible with the browser.getAttribute method
 *
 * @property {number[]} [rowNumbers] An array of row numbers to retrieve. Row numbers start with 1, not 0.
 */


/**
 * Given the selector of a table, returns an object with two properties:
 * `tableHash`, and object that mirrors the form of the cucumber table `hashes()` method,
 * and `tableElements`, an array of objects where each key is a table header and each value is the corresponding webdriver element.
 * With the `options` parameter, you can populate `selectors` with alternate selector strings to find table elements, `blankHeaders` with
 * names to provide blank headers, `altAttributes` with alternate element attributes to retrieve, such as an element class, and `rowNumbers` with specific
 * rows to get data from.
 * @author Alexander Urizar <aurizar@intersystems.com>
 * @param  tableSelector
 * @param  options
 * @example
 * // will name the first blank column 'StatusType', retrieve its class, and only retrieve rows 1, 3, and 4
 * processTable('#tOEOrdItem_ListEMR_0', {
 *   blankHeaders: ['StatusType'],
 *   altAttributes: { StatusType: 'class' },
 *   rowNumbers: [1, 3, 4]
 * })
 */
export function processTable(tableSelector, options = defaultOptions) {
    console.log(`- Processing table "${tableSelector}"`);

    // overwrite any of the default options with the options parameter
    const finalOptions = Object.assign({}, defaultOptions, options);
    const { blankHeaders, altAttributes, rowNumbers, selectors } = finalOptions;

    // grab the table element
    const table = $(tableSelector);
    // grab the headers, returning an array of strings
    const headerElements = table.$$(selectors.headers).filter(checkDisplay);
    // not sure what happens if you mutate input parameters, and I'm not about to find out
    const blanks = [...blankHeaders];
    console.log("blanks is " + JSON.stringify(blanks));
    // for each blank header, grab a value from `blanks` and replace it with that
    const headers = headerElements.map((headerElement, i) => {
        const header = headerElement.getText();
        if (!header.trim()) {
            if (blanks.length > 0) {
                return blanks.shift();
            }
            // if there's a blank header detected but blanks is empty, return a generic name
            return `Header${i}`;
        }
        // @ts-ignore
        return header.trimRight('»').trim();
    });

    console.log(`  - headers: ${headers.join(", ")}`);

    const allrows = table.$$(selectors.rows);
    const rows = rowNumbers.length === 0 ? allrows : rowNumbers.map(i => allrows[i]);

    process.stdout.write(`  - rows: `);

    const processedTable = rows.map((row, i) => {
        process.stdout.write(`${rowNumbers.length > 0 ? rowNumbers[i] : i + 1} `);

        const cells = row.$$(selectors.rowCells).filter(checkDisplay);

        const mappedCells = cells.map((cell, i) => {
            const header = headers[i];
            // if the altAttributes object has the header, return the specified attribute instead
            if (has(altAttributes, header)) {
                return cell.getAttribute(altAttributes[header]);
            }
            // by default, grab the cell text
            return cell.getText().trim();
        });

        // create an object which will be in a form similar to a DataTable `hashes()` method
        const rowHash = fromPairs(zip(headers, mappedCells));
        // create an object with values of the found WebdriverElement
        const rowElements = fromPairs(zip(headers, cells));
        return { rowHash, rowElements };
    });
    console.log();

    /** This is the form equal to a cucumber table's `hashes()` method */
    const tableHash = processedTable.map(r => r.rowHash);
    /** This is a form with just the WebdriverElements */
    const tableElements = processedTable.map(r => r.rowElements);
    return { tableHash, tableElements };
}

/**
 * Checks whether an element has a display value other than 'none'
 * @param element
 * @returns {boolean}
 */
const checkDisplay = (element: WebdriverIO.Element)  => {
    const display = element.getCSSProperty("display");
    return display.value !== "none";
};

/**
 * Validates the expected value is equal to the actual value
 * @param {string} eValue
 * @param {string} aValue
 * @param {string} col
 * @param {number} index
 */
function defaultValidator(eValue, aValue, col, index) {
    const errMsg = `Column "${col}" Row ${index + 1} incorrect`;
    expect(aValue, errMsg).to.equal(eValue);
}

/**
 * @callback validateFunction
 * Function to call for each row in the table.
 * @param {string} expectedValue
 * @param {string} actualValue
 * @param {string} [column]
 * @param {number} [index]
 */

/**
 * Type for tables input into 'validateBy'
 */
type Table = { [key: string]: string }[]

/**
 * validateBy is a helper function for validating a feature file table against "tableHash" from processTable
 * @param {Array.<Object.<string, string>>} expectedTable  from Cucumber table.hashes()
 * @param {Array.<Object.<string, string>>} actualTable "tableHash" from the result of processTable
 * @param  validator callback function for validation.
 */
export function validateBy(expectedTable: Table, actualTable: Table, validator = defaultValidator) {
    // make sure that expectedTable and actualTable are the same length
    let minLength = expectedTable.length;
    if (actualTable.length < minLength) {
        minLength = actualTable.length;
    }
    const ett = expectedTable.slice(0, minLength);
    const att = actualTable.slice(0, minLength);

    zip(ett, att).forEach(([eRow, aRow], index) => {
        forEach(eRow, (eValue, col) => {
            const aValue = aRow[col];
            validator(eValue, aValue, col, index);
        });
    });
}

/**
 * Validates the expected value is equal to the actual value
 * @param {string} eValue
 * @param {string} aValue
 * @param {string} col
 * @param {number} index
 */
export function includesValidator(eValue, aValue, col, index) {
    const errMsg = `Column "${col}" Row ${index + 1} incorrect`;
    expect(aValue, errMsg).to.include(eValue);
    // assert.include(aValue,eValue,errMsg);
}

