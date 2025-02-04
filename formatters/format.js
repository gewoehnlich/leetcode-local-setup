import { formatCpp } from "./_formatters/cpp/cpp.js";

export async function formatTestcases(parsedTestcases, fileformat, codeTemplate) {
    return new Promise((resolve, reject) => {
        console.log(parsedTestcases);
        console.log(fileformat);
        console.log(codeTemplate);

        switch (fileformat) {
            case ".cpp":
                const result = formatCpp(parsedTestcases, codeTemplate);
                break;
            case ".java":
                const result = formatJava(); break;
            case ".py":
                const result = formatPy(); break;
            case ".c": 
                const result = formatC(); break;
            case ".cs":
                const result = formatCs(); break;
            case ".js":
                const result = formatJs(); break;
            case ".ts":
                const result = formatTs(); break;
            case ".php":
                const result = formatPhp(); break;
            case ".swift":
                const result = formatSwift(); break;
            case ".kt":
                const result = formatKt(); break;
            case ".go":
                const result = formatGo(); break;
            case ".rb":
                const result = formatRb(); break;
            case ".scala":
                const result = formatScala(); break;
            case ".rs":
                const result = formatRs(); break;
            case ".rkt":
                const result = formatRkt(); break;
            case ".erl":
                const result = formatErl(); break;
            case ".ex":
                const result = formatEx(); break;
            default:
                break;
        }

        resolve(result);
    });
}
