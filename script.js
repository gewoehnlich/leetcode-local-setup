export {};

import { checkIfActivePageIsLeetcode, getLeetcodePageContent } from "./_handlers/file.js";
import { parseCodeTemplate } from "./_parsers/template.js";
import { parseTestcases } from "./_parsers/testcases.js";
import { getFileFormat } from "./_parsers/fileformat.js";

(async () => {
    const isLeetcodePage = await checkIfActivePageIsLeetcode();
    if (!isLeetcodePage) {
        throw new Error("not on leetcode webpage, stopping execution.");
    }
    
    const webpage = await getLeetcodePageContent();
    const codeTemplate = await parseCodeTemplate(webpage);
    const parsedTestcases = await parseTestcases(webpage);
    const fileformat = await getFileFormat(webpage);
    //const testcases = await getTestcases(parsedTestcases, fileformat);
    //const file = await compileFile(codeTemplate, testcases, fileformat);
})();

