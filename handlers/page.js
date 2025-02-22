
import { 
    NoActiveTabError, 
    NotLeetcodeProblemPageError, 
    ParsingError 
} from "../errors/page.js";

import { browserApi } from "./constants.js";

export async function parseProps() {
    return new Promise((resolve) => {
        browserApi.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
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

				const parser = new DOMParser();
				const doc = parser.parseFromString(page, "text/html");
				const props = doc.getElementById("__NEXT_DATA__").textContent.trim();

				// try {
				//   const parsedData = JSON.parse(props);
				//   console.dir(parsedData.props); // "test"
				// } catch (error) {
				//   console.error("Fix needed:", error);
				// }
				// // console.log(props);
				// console.log(JSON.stringify(props));
				// console.log(props.charCodeAt(0));
				// console.log(props.charCodeAt(1));
				//             resolve(JSON.stringify(props)); 
				// console.dir(JSON.parse(props));
				resolve(JSON.parse(props));
            } 

            catch (error) {
                throw new ParsingError();
            }
        });
    });
}
