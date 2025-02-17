
import { getLeetcodeProblemPageHTML } from "./page.js";
import { parseCodeTemplate } from "../parsers/template.js";
import { parseTestcases } from "../parsers/testcases.js";
import { getFileFormat } from "../parsers/fileformat.js";
import { formatTestcases } from "../formatters/format.js";

export async function main() {
    const webpage = await getLeetcodeProblemPageHTML(); 
    const codeTemplate = await parseCodeTemplate(webpage);
    // const defaultTemplate = parseDefaultCodeTemplate(webpage);
    // const parsedTestcases = await parseTestcases(webpage);
    // console.dir(parsedTestcases);
    // const fileformat = await getFileFormat(webpage);
    // const testcases = await formatTestcases(parsedTestcases, fileformat, codeTemplate);
    // const file = await compileFile(codeTemplate, testcases, fileformat);
}

