
import {
    NoKeysFoundOnTestResultTab,
    NoNecessaryEditorDivsFound,
    NoInputValuesAreFound,
    InputOutputParsingError,
    ParsingError 
} from "../errors/testcases.js";

export async function parseTestcases(html) {
    return new Promise((resolve) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            if (!doc) {
                throw new ParsingError();
            }

            const testcases = {};
            
            if (checkIfTestResultTabIsSet(doc)) {
                parseTestResultTab(doc, testcases);
            } else {
                parseLeftPanel(doc, testcases);
            }
            
            resolve(testcases);
        } 

        catch (error) {
            throw new ParsingError();
        }
    });
}

function checkIfTestResultTabIsSet(doc) {
    const editors = doc.querySelectorAll("div.cm-editor");
    return editors.length >= 2; 
}

function parseTestResultTab(doc, testcases) {
    const keys = Array.from(
        doc.querySelectorAll(
            "div.mx-3.mb-2.text-xs.text-label-3.dark\\:text-dark-label-3"
        )
    )
        .map(key => key.textContent.replace(/\s*=\s*$/, ''));

    if (!keys) {
        throw new NoKeysFoundOnTestResultTab();
    }

    const editors = doc.querySelectorAll("div.cm-editor");

    if (!editors[1] || !editors[3]) {
        throw new NoNecessaryEditorDivsFound();
    }

    const inputValues = Array.from(
        editors[1].querySelectorAll("div.cm-line")
    )
        .map(div => div.textContent.trim()); 

    if (!inputValues) {
        throw new NoInputValuesAreFound();
    }

    inputValues.forEach((text, i) => {
        const key = keys[i % keys.length];
        if (!testcases[key]) testcases[key] = [];
        testcases[key].push(text);
    });

    testcases["expected"] = Array.from(
        editors[3].querySelectorAll("div.cm-line")
    )
        .map(div => div.textContent);
}

function parseLeftPanel(doc, testcases) {
    const examples = doc.querySelector("div.elfjS").querySelectorAll("pre");

    examples.forEach(pre => {
        const [input, output] = parseLeftPanelExample(pre.textContent);
        updateDict(testcases, input, output);
    });
}

function parseLeftPanelExample(data) {
    const inputMatch = data.match(/Input: (.*?)Output:/s);
    const outputMatch = data.match(/Output: (.*?)(Explanation:|$)/s);
    
    if (!inputMatch || !outputMatch) {
        throw new InputOutputParsingError(); 
    }
    
    return [inputMatch[1].trim(), outputMatch[1].trim()];
}

function updateDict(testcases, input, output) {
    const data = input.split(/,\s*(?![^\[]*\])/);
    
    data.forEach(record => {
        const [name, value] = record.split("=").map(s => s.trim());
        if (!testcases[name]) testcases[name] = [];
        testcases[name].push(value);
    });
    
    if (!testcases["expected"]) testcases["expected"] = [];
    testcases["expected"].push(output);
}
