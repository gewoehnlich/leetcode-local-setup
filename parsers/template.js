
import { 
    NoTemplateDivFound,
    ParsingError 
} from "../errors/template.js";

export async function parseCodeTemplate(html) {
    return new Promise((resolve, reject) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            if (!doc) {
                throw new ParsingError();
            }

            getCodeTemplate(doc)
                .then((codeTemplate) => resolve(codeTemplate))
                .catch((error) => reject(error));

            resetTemplateToDefault(doc);
        }

        catch (error) {
            reject(new ParsingError());
        }
    });
}

async function getCodeTemplate(doc) {
    return new Promise((resolve, reject) => {
        try {
            let template = "";
            const codeLines = doc.querySelectorAll(
                ".view-lines.monaco-mouse-cursor-text div"
            );
            
            if (codeLines.length === 0) {
                throw new NoTemplateDivFound();
            }

            codeLines.forEach((div) => {
                const span = div.querySelector("span");
                if (span) {
                    template += span.textContent + "\n";
                }
            });

            resolve(template);
        } 

        catch (error) {
            reject(new ParsingError());
        }
    });
}

async function resetTemplateToDefault(doc) {
    return new Promise((resolve, reject) => {
        try {
            const buttons = doc.querySelectorAll("div.relative.inline-flex.gap-2.items-center.justify-center.font-medium.cursor-pointer.focus-visible\\:outline-none.disabled\\:cursor-not-allowed.disabled\\:opacity-50.transition-colors.bg-transparent.enabled\\:hover\\:bg-fill-secondary.enabled\\:active\\:bg-fill-primary.text-caption.rounded.text-text-primary.group.ml-auto.p-1");
            
            console.log(buttons.length);
            if (buttons.length != 4) {
                throw new ParsingError();
            }
            
            buttons[3].click();
            resolve();
        }

        catch (error) {
            reject(new ParsingError());
        }
    });
}
