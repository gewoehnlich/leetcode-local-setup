import { formatCpp } from "./cpp/cpp.js";

export async function formatTestcases(parsedTestcases, fileformat, codeTemplate) {
    return new Promise((resolve, reject) => {
        console.log(parsedTestcases);
        console.log(fileformat);
        console.log(codeTemplate);

        let result;
        switch (fileformat) {
            case ".cpp":
                result = formatCpp(parsedTestcases, codeTemplate);
                break;
            case ".java":
                result = formatJava(); break;
            case ".py":
                result = formatPy(); break;
            case ".c": 
                result = formatC(); break;
            case ".cs":
                result = formatCs(); break;
            case ".js":
                result = formatJs(); break;
            case ".ts":
                result = formatTs(); break;
            case ".php":
                result = formatPhp(); break;
            case ".swift":
                result = formatSwift(); break;
            case ".kt":
                result = formatKt(); break;
            case ".go":
                result = formatGo(); break;
            case ".rb":
                result = formatRb(); break;
            case ".scala":
                result = formatScala(); break;
            case ".rs":
                result = formatRs(); break;
            case ".rkt":
                result = formatRkt(); break;
            case ".erl":
                result = formatErl(); break;
            case ".ex":
                result = formatEx(); break;
            default:
                break;
        }

        resolve(result);
    });
}
