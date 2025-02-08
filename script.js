
import { checkIfActivePageIsLeetcode, getLeetcodePageContent } from "./handlers/file.js";
import { parseCodeTemplate } from "./parsers/template.js";
import { parseTestcases } from "./parsers/testcases.js";
import { getFileFormat } from "./parsers/fileformat.js";
import { formatTestcases } from "./formatters/format.js";


(async () => {
    console.log(123);
    // const config = await getConfig(); // move it to background.js
    // const webpage = await getLeetcodePageContent(); 
    // const codeTemplate = await parseCodeTemplate(webpage);
    // const parsedTestcases = await parseTestcases(webpage);
    // const fileformat = await getFileFormat(webpage);
    // const testcases = await formatTestcases(parsedTestcases, fileformat, codeTemplate);
    // const file = await compileFile(codeTemplate, testcases, fileformat);
})();

async function main() {
    console.log(123);
}

