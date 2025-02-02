export async function parseTestcases(html) {
    return new Promise((resolve, reject) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const testcases = {};

            if (checkIfTestResultTabIsSet(doc)) {
                parseTestResultTab(doc, testcases);
            } else {
                parseLeftPanel(doc, testcases);
            }

            console.dir(testcases);
            resolve(testcases);
        } catch (error) {
            console.error("Error parsing testcases:", error);
            reject(error);
        }
    });
}

function checkIfTestResultTabIsSet(doc) {
    const div = doc.querySelector("div.flex.h-full.items-center.justify-center.text-label-4.dark\\:text-dark-label-4");
    return !div || div.textContent.trim() !== "You must run your code first";
}

function parseTestResultTab(doc, testcases) {
    const keys = Array.from(doc.querySelectorAll("div.cm-editor.ͼ1.ͼ3.ͼ4.ͼ50.ͼ2z"))
        .map(key => key.textContent.replace(/\s*=\s*$/, ''));
    console.dir(keys);

    //const inputValues = doc.querySelector("div.cm-editor.ͼ1.ͼ3.ͼ4.ͼ4w.ͼ2z")?.querySelectorAll("div.cm-line") || [];
const inputValues = Array.from(
    doc.querySelector("div.cm-editor.ͼ1.ͼ3.ͼ4.ͼ4w.ͼ2z")?.querySelectorAll("div.cm-line") || []
).map(div => div.textContent.trim()); 
    console.dir(inputValues);
    
    inputValues.forEach((div, i) => {
        console.log(div.textContent);
        const key = keys[i % keys.length];
        if (!testcases[key]) testcases[key] = [];
        testcases[key].push(div.textContent);
    });

    testcases["expected"] = Array.from(
        doc.querySelector("div.cm-editor.ͼ1.ͼ3.ͼ4.ͼ4y.ͼ41")?.querySelectorAll("div.cm-line") || []
    ).map(div => div.textContent);
}

function parseLeftPanel(doc, testcases) {
    const examples = doc.querySelector("div.elfjS")?.querySelectorAll("pre") || [];
    examples.forEach(pre => {
        const [input, output] = parseLeftPanelExample(pre.textContent);
        updateDict(testcases, input, output);
    });
}

function parseLeftPanelExample(data) {
    const inputMatch = data.match(/Input: (.*?)Output:/s);
    const outputMatch = data.match(/Output: (.*?)(Explanation:|$)/s);
    
    if (!inputMatch || !outputMatch) {
        throw new Error("Could not parse input/output from left panel.");
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
    
    if (!testcases["output"]) testcases["output"] = [];
    testcases["output"].push(output);
}
