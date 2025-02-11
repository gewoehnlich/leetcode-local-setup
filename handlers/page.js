
import { 
    NoActiveTabError, 
    NotLeetcodeProblemPageError, 
    ParsingError 
} from "../errors/page.js";

import { api } from "./constants.js";

export async function getLeetcodeProblemPageHTML() {
    return new Promise((resolve) => {
        api.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (tabs.length < 1) {
                throw new NoActiveTabError();
            }

            const activeTab = tabs[0];
            const url = activeTab.url;

            if (!url.includes("leetcode.com/problems")) {
                throw new NotLeetcodeProblemPageError();
            }

            const id = activeTab.id;

            try {
                const results = await chrome.scripting.executeScript({
                    target: { tabId: id },
                    func: () => document.documentElement.outerHTML
                });

                if (!results || results.length === 0) {
                    throw new ParsingError();
                }
                
                const page = results[0].result;
                resolve(page); 
            } 

            catch (error) {
                throw new ParsingError();
            }
        });
    });
}
