export async function parseCodeTemplate(html) {
    return new Promise((resolve, reject) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            let template = "";
            const codeLines = doc.querySelectorAll(".view-lines.monaco-mouse-cursor-text div");

            codeLines.forEach((div) => {
                template += div.querySelectorAll("span")[0].textContent + "\n";
            });
            
            resolve(template);
        } catch (error) {
            console.error("Error fetching or parsing page:", error);
            reject(error);
            return false;
        }
    });
}

